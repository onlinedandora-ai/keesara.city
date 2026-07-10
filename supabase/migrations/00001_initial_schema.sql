-- Enums
CREATE TYPE public.user_role AS ENUM ('resident', 'team_editor', 'business_owner', 'admin');
CREATE TYPE public.post_status AS ENUM ('live', 'flagged', 'removed');
CREATE TYPE public.validation_type AS ENUM ('confirm', 'dispute');
CREATE TYPE public.business_status AS ENUM ('active', 'pending', 'removed');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Resident',
  phone TEXT,
  role public.user_role NOT NULL DEFAULT 'resident',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Businesses
CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID NOT NULL REFERENCES public.categories (id),
  description TEXT,
  address TEXT,
  phone TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  claimed_by UUID REFERENCES public.profiles (id),
  status public.business_status NOT NULL DEFAULT 'active',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC(2, 1),
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- News posts
CREATE TABLE public.news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles (id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status public.post_status NOT NULL DEFAULT 'live',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Journal posts
CREATE TABLE public.journal_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.profiles (id),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  body TEXT NOT NULL,
  category TEXT,
  published_at TIMESTAMPTZ,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Comments
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles (id),
  news_post_id UUID REFERENCES public.news_posts (id) ON DELETE CASCADE,
  journal_post_id UUID REFERENCES public.journal_posts (id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments (id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT comments_target_check CHECK (
    (news_post_id IS NOT NULL AND journal_post_id IS NULL)
    OR (news_post_id IS NULL AND journal_post_id IS NOT NULL)
  )
);

-- Validations
CREATE TABLE public.validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id),
  news_post_id UUID NOT NULL REFERENCES public.news_posts (id) ON DELETE CASCADE,
  type public.validation_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, news_post_id)
);

-- Validation stats view
CREATE OR REPLACE VIEW public.news_post_stats AS
SELECT
  np.id AS post_id,
  COALESCE(SUM(CASE WHEN v.type = 'confirm' THEN 1 ELSE 0 END), 0)::INT AS confirm_count,
  COALESCE(SUM(CASE WHEN v.type = 'dispute' THEN 1 ELSE 0 END), 0)::INT AS dispute_count,
  (
    COALESCE(SUM(CASE WHEN v.type = 'confirm' THEN 1 ELSE 0 END), 0) >= 5
    AND COALESCE(SUM(CASE WHEN v.type = 'dispute' THEN 1 ELSE 0 END), 0)::FLOAT
      / NULLIF(COALESCE(SUM(CASE WHEN v.type = 'confirm' THEN 1 ELSE 0 END), 0), 0) < 0.2
  ) AS is_community_verified
FROM public.news_posts np
LEFT JOIN public.validations v ON v.news_post_id = np.id
GROUP BY np.id;

-- Helper functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_editor_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('team_editor', 'admin')
  );
$$;

CREATE OR REPLACE FUNCTION public.check_news_post_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM public.news_posts
    WHERE author_id = NEW.author_id
      AND created_at > now() - INTERVAL '1 day'
  ) >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded: max 5 posts per day';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER news_posts_rate_limit
  BEFORE INSERT ON public.news_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.check_news_post_rate_limit();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'display_name',
      NEW.raw_user_meta_data ->> 'name',
      'Resident'
    ),
    NEW.phone,
    'resident'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Indexes
CREATE INDEX idx_businesses_category ON public.businesses (category_id);
CREATE INDEX idx_businesses_status ON public.businesses (status);
CREATE INDEX idx_news_posts_status_created ON public.news_posts (status, created_at DESC);
CREATE INDEX idx_journal_posts_published ON public.journal_posts (published_at DESC);
CREATE INDEX idx_validations_post ON public.validations (news_post_id);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

-- Businesses policies
CREATE POLICY "Active businesses are public"
  ON public.businesses FOR SELECT
  USING (status = 'active' OR public.is_editor_or_admin() OR public.is_admin());

CREATE POLICY "Admins manage businesses"
  ON public.businesses FOR ALL
  USING (public.is_admin());

CREATE POLICY "Owners update claimed businesses"
  ON public.businesses FOR UPDATE
  USING (claimed_by = auth.uid());

-- News posts policies
CREATE POLICY "Live news is public"
  ON public.news_posts FOR SELECT
  USING (
    status = 'live'
    OR author_id = auth.uid()
    OR public.is_editor_or_admin()
  );

CREATE POLICY "Authenticated users create news"
  ON public.news_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors and editors update news"
  ON public.news_posts FOR UPDATE
  USING (author_id = auth.uid() OR public.is_editor_or_admin());

-- Journal policies
CREATE POLICY "Published journal is public"
  ON public.journal_posts FOR SELECT
  USING (published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Editors manage journal"
  ON public.journal_posts FOR ALL
  USING (public.is_editor_or_admin());

-- Comments policies
CREATE POLICY "Comments are public"
  ON public.comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users comment"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Validations policies
CREATE POLICY "Validations are public"
  ON public.validations FOR SELECT USING (true);

CREATE POLICY "Authenticated users validate"
  ON public.validations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own validation"
  ON public.validations FOR UPDATE
  USING (auth.uid() = user_id);

-- Grant view access
GRANT SELECT ON public.news_post_stats TO anon, authenticated;
