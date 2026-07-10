"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
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
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  const refreshUser = useCallback(async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    setUser(currentUser);
  }, [supabase]);

  useEffect(() => {
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

  const value = useMemo(
    () => ({
      user,
      openAuth: () => setAuthOpen(true),
      closeAuth: () => setAuthOpen(false),
      openPostNews,
      closePostNews: () => setPostOpen(false),
      refreshUser,
    }),
    [user, openPostNews, refreshUser],
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
