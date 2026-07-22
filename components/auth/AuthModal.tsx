"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
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
          ? "Google login isn’t enabled yet. Use phone OTP, or ask an admin to turn on Google in Supabase Auth."
          : oauthError.message,
      );
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
          <div className="flex items-center gap-2">
            <ThemeToggle variant="pill" showLabel={false} />
            <button
              type="button"
              onClick={close}
              className="ml-1 rounded-lg p-1 text-ink-mute hover:bg-paper hover:text-ink transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
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
          or
          <span className="h-px flex-1 bg-line" />
        </div>

        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          Continue with Google
        </Button>

        <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-xs text-ink-soft">
          <span>Appearance theme</span>
          <ThemeToggle variant="button" showLabel={true} />
        </div>
      </div>
    </div>
  );
}
