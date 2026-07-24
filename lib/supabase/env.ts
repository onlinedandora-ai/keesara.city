export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  const isPlaceholder = anonKey === "your-anon-key" || url === "" || url.includes("placeholder");
  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && !isPlaceholder),
  };
}

/** Values that satisfy @supabase/ssr during `next build` when env is not set yet. */
export function getSupabaseEnvOrPlaceholder() {
  const env = getSupabaseEnv();
  if (env.isConfigured) return env;
  return {
    url: "https://placeholder.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder",
    isConfigured: false,
  };
}
