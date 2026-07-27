export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  let isValidUrl = false;
  try {
    if (url) {
      const parsed = new URL(url);
      isValidUrl = parsed.protocol === "http:" || parsed.protocol === "https:";
    }
  } catch {
    isValidUrl = false;
  }

  const isPlaceholder =
    !isValidUrl ||
    !anonKey ||
    anonKey === "your-anon-key" ||
    url.includes("placeholder");

  return {
    url: isValidUrl ? url : "https://placeholder.supabase.co",
    anonKey: anonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder",
    isConfigured: Boolean(isValidUrl && anonKey && !isPlaceholder),
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
