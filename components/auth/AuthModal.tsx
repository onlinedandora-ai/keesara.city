"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

const isLocal =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes("127.0.0.1");

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { refreshUser } = useApp();
  const [phone, setPhone] = useState(isLocal ? "9876543210" : "");
  const [otp, setOtp] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const supabase = createClient();

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("91") && digits.length >= 12) return `+${digits}`;
    if (digits.length === 10) return `+91${digits}`;
    if (value.trim().startsWith("+")) return `+${digits}`;
    return `+${digits}`;
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formatted = formatPhone(phone);
    if (!/^\+91\d{10}$/.test(formatted) && !isLocal) {
      setLoading(false);
      setError("Enter a valid 10-digit Indian mobile number");
      return;
    }
    const { error: otpError } = await supabase.auth.signInWithOtp({
      phone: formatted,
      options: {
        data: displayName.trim()
          ? { display_name: displayName.trim(), name: displayName.trim() }
          : undefined,
      },
    });
    setLoading(false);
    if (otpError) {
      setError(otpError.message);
      return;
    }
    setStep("otp");
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formatted = formatPhone(phone);
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      phone: formatted,
      token: otp.trim(),
      type: "sms",
    });
    if (verifyError) {
      setLoading(false);
      setError(verifyError.message);
      return;
    }

    if (data.user && displayName.trim()) {
      await supabase
        .from("profiles")
        .update({ display_name: displayName.trim() })
        .eq("id", data.user.id);
    }

    setLoading(false);
    await refreshUser();
    onClose();
    setStep("phone");
    setOtp("");

    const redirect =
      typeof window !== "undefined"
        ? sessionStorage.getItem("postAuthRedirect")
        : null;
    if (redirect) {
      sessionStorage.removeItem("postAuthRedirect");
      window.location.assign(redirect);
    }
  };

  const signInWithGitHub = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (oauthError) {
        setError(
          oauthError.message.includes("provider is not enabled")
            ? "GitHub login isn’t enabled in Supabase Auth settings yet."
            : oauthError.message,
        );
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to initiate sign in";
      setError(`Authentication error: ${msg}. Make sure your Supabase URL and Anon Key in .env.local are valid.`);
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (oauthError) {
        setError(
          oauthError.message.includes("provider is not enabled")
            ? "Google login provider is not enabled in Supabase config or dashboard."
            : oauthError.message,
        );
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to initiate sign in";
      setError(`Authentication error: ${msg}. Make sure your Supabase URL and Anon Key in .env.local are valid.`);
      setLoading(false);
    }
  };

  const close = () => {
    setError(null);
    setStep("phone");
    setOtp("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs p-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl border border-line">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="auth-title" className="text-lg font-bold text-teal-900">
            {step === "phone" ? "Login with phone" : "Enter OTP"}
          </h2>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1 text-ink-mute hover:bg-paper hover:text-ink transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {step === "phone" ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <p className="text-sm text-ink-soft">
              Enter your mobile number. We&apos;ll send a one-time code — no password needed.
            </p>
            {isLocal && (
              <p className="rounded-lg bg-teal-100/30 border border-teal-700/20 px-3 py-2 text-xs text-teal-700">
                Local test: use <strong>9876543210</strong>, then OTP{" "}
                <strong>123456</strong>
              </p>
            )}
            <div>
              <label htmlFor="display-name" className="mb-1 block text-sm font-medium text-ink">
                Display name <span className="font-normal text-ink-mute">(optional)</span>
              </label>
              <input
                id="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How neighbors will see you"
                className="w-full rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-700"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink">
                Mobile number
              </label>
              <div className="flex overflow-hidden rounded-lg border border-line bg-card focus-within:border-teal-700">
                <span className="flex items-center bg-paper border-r border-line px-3 text-sm font-medium text-ink-soft">
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm text-ink outline-none"
                  required
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || phone.length < 10}>
              {loading ? "Sending…" : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <p className="text-sm text-ink-soft">Code sent to {formatPhone(phone)}</p>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="6-digit code"
              className="w-full rounded-lg border border-line bg-card px-3 py-2.5 text-center text-lg text-ink tracking-[0.3em] outline-none focus:border-teal-700"
              required
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || otp.length < 6}>
              {loading ? "Verifying…" : "Verify & continue"}
            </Button>
            <button
              type="button"
              className="text-sm text-teal-700 hover:underline"
              onClick={() => {
                setStep("phone");
                setOtp("");
                setError(null);
              }}
            >
              Change number
            </button>
          </form>
        )}

        <div className="my-5 flex items-center gap-3 text-xs text-ink-mute">
          <span className="h-px flex-1 bg-line" />
          or continue with
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="ghost"
            className="w-full text-xs flex items-center justify-center gap-2"
            onClick={signInWithGitHub}
            disabled={loading}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-xs flex items-center justify-center gap-2"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google
          </Button>
        </div>


        <div className="mt-3 text-center text-xs text-ink-mute">
          Powered by{" "}
          <a
            href="https://dandora.online"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:text-teal-700"
          >
            Dandora Online
          </a>
        </div>
      </div>
    </div>
  );
}
