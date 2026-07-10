import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createNewsPostSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createNewsPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const blocked = ["spam", "scam"];
  const lower = `${parsed.data.title} ${parsed.data.body}`.toLowerCase();
  if (blocked.some((word) => lower.includes(word))) {
    return NextResponse.json({ error: "Content flagged by filter" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("news_posts")
    .insert({
      author_id: user.id,
      title: parsed.data.title,
      body: parsed.data.body,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ post: data });
}
