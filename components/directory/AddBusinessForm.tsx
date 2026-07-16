"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import type { Category } from "@/lib/types";

type AddBusinessFormProps = {
  categories: Category[];
};

type FormState = {
  name: string;
  categoryId: string;
  description: string;
  address: string;
  phone: string;
  locationUrl: string;
  website: string;
};

const empty: FormState = {
  name: "",
  categoryId: "",
  description: "",
  address: "",
  phone: "",
  locationUrl: "",
  website: "",
};

export function AddBusinessForm({ categories }: AddBusinessFormProps) {
  const router = useRouter();
  const { user, openAuth } = useApp();
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.sort_order - b.sort_order),
    [categories],
  );

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuth();
      return;
    }
    setLoading(true);
    setError(null);

    const res = await fetch("/api/businesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        categoryId: form.categoryId,
        description: form.description,
        address: form.address,
        phone: form.phone,
        locationUrl: form.locationUrl,
        website: form.website,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Could not save listing");
      return;
    }

    router.push(`/directory/${data.business.slug}?listed=1`);
    router.refresh();
  };

  if (!user) {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 text-center">
        <h2 className="text-xl font-bold text-teal-900">Login to add your business</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
          Residents and owners use the same phone login. After you sign in, you can list your
          business free on the Keesara directory.
        </p>
        <Button className="mt-6" onClick={openAuth}>
          Login to continue
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6 rounded-2xl border border-line bg-card p-6 md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
          Free listing
        </p>
        <h2 className="mt-1 text-2xl font-bold text-teal-900">Business details</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Fill in what residents need to find and contact you. Listings go live right away.
        </p>
      </div>

      <Field label="Business name" htmlFor="biz-name" required>
        <input
          id="biz-name"
          value={form.name}
          onChange={set("name")}
          placeholder="e.g. Sri Sai Diagnostics"
          className={inputClass}
          required
        />
      </Field>

      <Field label="Category" htmlFor="biz-category" required>
        <select
          id="biz-category"
          value={form.categoryId}
          onChange={set("categoryId")}
          className={inputClass}
          required
        >
          <option value="">Select a category</option>
          {sortedCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="About your business"
        htmlFor="biz-description"
        hint="What you offer, areas you serve, hours if useful"
        required
      >
        <textarea
          id="biz-description"
          value={form.description}
          onChange={set("description")}
          rows={4}
          placeholder="Family-run clinic near Keesara bus stand. Open Mon–Sat 9am–8pm."
          className={inputClass}
          required
        />
      </Field>

      <Field label="Address" htmlFor="biz-address" required>
        <input
          id="biz-address"
          value={form.address}
          onChange={set("address")}
          placeholder="Landmark / road, Keesara, Hyderabad 501301"
          className={inputClass}
          required
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Phone" htmlFor="biz-phone" required>
          <input
            id="biz-phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+91 98765 43210"
            className={inputClass}
            required
          />
        </Field>
        <Field
          label="Website"
          htmlFor="biz-website"
          hint="Optional"
        >
          <input
            id="biz-website"
            type="url"
            value={form.website}
            onChange={set("website")}
            placeholder="https://"
            className={inputClass}
          />
        </Field>
      </div>

      <Field
        label="Google Maps location link"
        htmlFor="biz-location"
        hint="Open Google Maps → your place → Share → Copy link"
        required
      >
        <input
          id="biz-location"
          type="url"
          value={form.locationUrl}
          onChange={set("locationUrl")}
          placeholder="https://maps.google.com/... or https://maps.app.goo.gl/..."
          className={inputClass}
          required
        />
      </Field>

      <div className="rounded-xl bg-teal-100/60 px-4 py-3 text-sm text-teal-900">
        Tip: On phone, open Google Maps, search your shop, tap <strong>Share</strong>, then paste
        the link here. We&apos;ll try to read coordinates from it automatically.
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Publishing…" : "Publish listing"}
        </Button>
        <p className="text-xs text-ink-mute">
          By publishing, you confirm this is your business in or around Keesara.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-amber-600"> *</span>}
        {hint && !required && (
          <span className="ml-1 font-normal text-ink-mute">({hint})</span>
        )}
      </label>
      {hint && required && <p className="mb-1.5 text-xs text-ink-mute">{hint}</p>}
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal-700";
