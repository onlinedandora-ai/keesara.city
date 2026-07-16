"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { AuthModal } from "@/components/auth/AuthModal";
import { PostNewsSheet } from "@/components/news/PostNewsSheet";

type AppContextValue = {
  user: User | null;
  openAuth: () => void;
  closeAuth: () => void;
  openPostNews: () => void;
  closePostNews: () => void;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  // Create the browser client only after mount so prerender/build never hits
  // @supabase/ssr with missing env vars.
  useEffect(() => {
    setSupabase(createClient());
  }, []);

  const refreshUser = useCallback(async () => {
    if (!supabase) return;
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    setUser(currentUser);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const openPostNews = useCallback(() => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    setPostOpen(true);
  }, [user]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  const value = useMemo(
    () => ({
      user,
      openAuth: () => setAuthOpen(true),
      closeAuth: () => setAuthOpen(false),
      openPostNews,
      closePostNews: () => setPostOpen(false),
      refreshUser,
      signOut,
    }),
    [user, openPostNews, refreshUser, signOut],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <PostNewsSheet open={postOpen} onClose={() => setPostOpen(false)} />
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
