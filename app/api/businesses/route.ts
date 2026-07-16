import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  createBusinessSchema,
  parseMapsCoordinates,
  slugifyBusinessName,
} from "@/lib/validation";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createBusinessSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const {
    name,
    categoryId,
    description,
    address,
    phone,
    locationUrl,
    website,
  } = parsed.data;

  const baseSlug = slugifyBusinessName(name) || "business";
  let slug = baseSlug;
  for (let i = 0; i < 5; i++) {
    const { data: existing } = await supabase
      .from("businesses")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
  }

  const { lat, lng } = parseMapsCoordinates(locationUrl);

  const { data, error } = await supabase
    .from("businesses")
    .insert({
      name: name.trim(),
      slug,
      category_id: categoryId,
      description: description.trim(),
      address: address.trim(),
      phone: phone.trim(),
      location_url: locationUrl.trim(),
      website: website?.trim() || null,
      lat,
      lng,
      claimed_by: user.id,
      status: "active",
      is_featured: false,
    })
    .select("id, slug, name")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ business: data });
}
