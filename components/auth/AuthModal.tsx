"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { refreshUser } = useApp();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const supabase = createClient();

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("91")) return `+${digits}`;
    if (digits.length === 10) return `+91${digits}`;
    return value.startsWith("+") ? value : `+${digits}`;
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formatted = formatPhone(phone);
    const { error: otpError } = await supabase.auth.signInWithOtp({ phone: formatted });
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
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: formatted,
      token: otp,
      type: "sms",
    });
    setLoading(false);
    if (verifyError) {
      setError(verifyError.message);
      return;
    }
    await refreshUser();
    onClose();
    setStep("phone");
    setOtp("");
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="auth-title" className="text-lg font-bold text-teal-900">
            {step === "phone" ? "Login with phone" : "Enter OTP"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-mute hover:text-ink"
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
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-teal-700"
              required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending…" : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <p className="text-sm text-ink-soft">Code sent to {formatPhone(phone)}</p>
            <input
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-teal-700"
              required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying…" : "Verify & continue"}
            </Button>
            <button
              type="button"
              className="text-sm text-teal-700"
              onClick={() => setStep("phone")}
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
      </div>
    </div>
  );
}
