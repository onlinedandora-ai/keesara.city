-- Owner-submitted business listings: location link + website
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS location_url TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT;

-- Owners can see their own listings (including pending)
DROP POLICY IF EXISTS "Active businesses are public" ON public.businesses;
CREATE POLICY "Businesses are viewable"
  ON public.businesses FOR SELECT
  USING (
    status = 'active'
    OR claimed_by = auth.uid()
    OR public.is_editor_or_admin()
  );

-- Authenticated users can submit a listing they claim
CREATE POLICY "Authenticated users submit businesses"
  ON public.businesses FOR INSERT
  WITH CHECK (
    auth.uid() = claimed_by
    AND status IN ('pending', 'active')
  );

-- Promote resident → business_owner when they claim a listing
CREATE OR REPLACE FUNCTION public.promote_to_business_owner()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.claimed_by IS NOT NULL THEN
    UPDATE public.profiles
    SET role = 'business_owner'
    WHERE id = NEW.claimed_by
      AND role = 'resident';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_business_claimed ON public.businesses;
CREATE TRIGGER on_business_claimed
  AFTER INSERT ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION public.promote_to_business_owner();
