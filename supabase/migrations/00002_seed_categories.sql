-- Seed categories
INSERT INTO public.categories (slug, name, sort_order) VALUES
  ('real-estate', 'Real estate', 1),
  ('education', 'Education', 2),
  ('healthcare', 'Healthcare', 3),
  ('food-retail', 'Food & retail', 4),
  ('home-services', 'Home services', 5),
  ('civic', 'Civic', 6),
  ('transport', 'Transport', 7);

-- Seed businesses
INSERT INTO public.businesses (name, slug, category_id, description, address, phone, is_featured, rating, review_count)
SELECT
  b.name,
  b.slug,
  c.id,
  b.description,
  b.address,
  b.phone,
  b.is_featured,
  b.rating,
  b.review_count
FROM (VALUES
  ('Sri Sai Real Estate', 'sri-sai-real-estate', 'real-estate', 'HMDA-approved plots near ORR Exit 8', 'Keesara, Telangana', '+91 98765 43210', true, 4.6, 82),
  ('Keesara Diagnostics', 'keesara-diagnostics', 'healthcare', 'Full-service diagnostic lab', 'Near Keesara bus stand', '+91 98765 43211', false, 4.4, 31),
  ('Little Stars School', 'little-stars-school', 'education', 'CBSE school for K-12', 'ORR Exit 8 corridor', '+91 98765 43212', false, 4.8, 56),
  ('ORR Fresh Mart', 'orr-fresh-mart', 'food-retail', 'Neighborhood grocery and fresh produce', 'Keesara main road', '+91 98765 43213', true, 4.3, 44),
  ('Venkateswara Home Services', 'venkateswara-home-services', 'home-services', 'Plumbing, electrical, and painting', 'Keesara village', '+91 98765 43214', false, 4.5, 28)
) AS b(name, slug, cat_slug, description, address, phone, is_featured, rating, review_count)
JOIN public.categories c ON c.slug = b.cat_slug;

-- Seed journal posts (team content, no author required)
INSERT INTO public.journal_posts (title, slug, excerpt, body, category, published_at, featured) VALUES
  (
    'Why Keesara is Hyderabad''s next ORR growth corridor',
    'keesara-orr-growth-corridor',
    'A look at what the Regional Ring Road alignment means for land values east of the city.',
    E'Keesara sits at a rare intersection of heritage, geography, and infrastructure. With ORR Exit 8 already channeling commuters and the Regional Ring Road on the horizon, the mandal is seeing sustained interest from both homebuyers and commercial developers.\n\nProximity to Pocharam IT SEZ — home to major employers like Infosys and Genpact — means daily footfall and housing demand are not speculative; they are already here. For residents, the question is no longer whether Keesara will grow, but how quickly civic infrastructure can keep pace.\n\nThis piece maps the key growth drivers, from transport links to emerging residential layouts, and what they mean if you live or invest here.',
    'Real estate',
    now() - INTERVAL '3 days',
    true
  ),
  (
    'Inside the Keesaragutta temple restoration plans',
    'keesaragutta-temple-restoration',
    'Heritage officials outline a multi-year plan to preserve the hilltop shrine and its ruins.',
    E'The Sri Ramalingeshwara Swamy Temple at Keesaragutta is more than a pilgrimage site — excavations on its northern slope have uncovered Vishnukundin-era structures and Jain idols dating to the 4th–5th century.\n\nState heritage officials are now coordinating a phased restoration plan aimed at protecting both the living temple and the archaeological remains beneath it. The approach balances devotee access during major festivals with structural conservation work that could take several years.\n\nWe spoke with local stakeholders about what residents can expect: improved pathways, documented ruins, and clearer visitor guidance during peak seasons like Maha Shivaratri.',
    'Civic',
    now() - INTERVAL '5 days',
    false
  ),
  (
    'Guide: schools and colleges near ORR Exit 8',
    'schools-near-orr-exit-8',
    'Every reputed institution within a 5km radius, mapped and compared.',
    E'Families moving into Keesara''s new layouts consistently ask the same question: where do children go to school?\n\nWithin a short drive of ORR Exit 8 you will find CBSE and state-board schools, junior colleges, and coaching centers serving both local and commuter families. This guide compares locations, approximate fee ranges, and transport access from major Keesara neighborhoods.\n\nWe update this list as new institutions open along the corridor — if we missed one, tell us via community news.',
    'Education',
    now() - INTERVAL '7 days',
    false
  );
