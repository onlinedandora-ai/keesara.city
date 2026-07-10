"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ValidationButtonsProps = {
  newsPostId: string;
  className?: string;
};

export function ValidationButtons({ newsPostId, className }: ValidationButtonsProps) {
  const { user, openAuth } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState<"confirm" | "dispute" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (type: "confirm" | "dispute") => {
    if (!user) {
      openAuth();
      return;
    }
    setLoading(type);
    setMessage(null);
    const res = await fetch("/api/validations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newsPostId, type }),
    });
    const data = await res.json();
    setLoading(null);
    if (!res.ok) {
      setMessage(data.error ?? "Something went wrong");
      return;
    }
    router.refresh();
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        type="button"
        variant="primary"
        className="px-3 py-1.5 text-xs"
        disabled={loading !== null}
        onClick={() => submit("confirm")}
      >
        {loading === "confirm" ? "…" : "Confirm"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="px-3 py-1.5 text-xs"
        disabled={loading !== null}
        onClick={() => submit("dispute")}
      >
        {loading === "dispute" ? "…" : "Dispute"}
      </Button>
      {message && <span className="text-xs text-red-600">{message}</span>}
    </div>
  );
}
