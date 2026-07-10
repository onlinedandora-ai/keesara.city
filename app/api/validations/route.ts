import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { validationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = validationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("validations").upsert(
    {
      user_id: user.id,
      news_post_id: parsed.data.newsPostId,
      type: parsed.data.type,
    },
    { onConflict: "user_id,news_post_id" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
