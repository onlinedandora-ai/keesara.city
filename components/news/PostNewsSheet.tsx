"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

type PostNewsSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function PostNewsSheet({ open, onClose }: PostNewsSheetProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Failed to post");
      return;
    }
    setTitle("");
    setBody("");
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-teal-900">Post community news</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <p className="mb-4 text-sm text-ink-soft">
          Your report goes live immediately and is tagged as unverified until neighbors confirm it.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="news-title" className="mb-1 block text-sm font-medium">
              Headline
            </label>
            <input
              id="news-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-teal-700"
              placeholder="What happened?"
              required
            />
          </div>
          <div>
            <label htmlFor="news-body" className="mb-1 block text-sm font-medium">
              Details
            </label>
            <textarea
              id="news-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-teal-700"
              placeholder="Where, when, and what residents should know…"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Posting…" : "Post update"}
          </Button>
        </form>
      </div>
    </div>
  );
}
