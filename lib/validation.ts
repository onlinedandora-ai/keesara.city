import { z } from "zod";

export const createNewsPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  body: z.string().min(20, "Please add more detail (at least 20 characters)").max(5000),
});

export const validationSchema = z.object({
  newsPostId: z.string().uuid(),
  type: z.enum(["confirm", "dispute"]),
});

export const createBusinessSchema = z.object({
  name: z.string().min(2, "Business name is required").max(120),
  categoryId: z.string().uuid("Pick a category"),
  description: z
    .string()
    .min(20, "Add a short description (at least 20 characters)")
    .max(1000),
  address: z.string().min(5, "Address is required").max(300),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20)
    .regex(/^[\d+\s()-]+$/, "Enter a valid phone number"),
  locationUrl: z
    .string()
    .url("Paste a valid Google Maps link")
    .refine(
      (url) =>
        /google\.[^/]+\/maps/i.test(url) ||
        /maps\.app\.goo\.gl/i.test(url) ||
        /goo\.gl\/maps/i.test(url) ||
        /maps\.google\./i.test(url),
      "Use a Google Maps location link",
    ),
  website: z
    .string()
    .url("Enter a valid website URL")
    .optional()
    .or(z.literal("")),
});

export type CreateNewsPostInput = z.infer<typeof createNewsPostSchema>;
export type ValidationInput = z.infer<typeof validationSchema>;
export type CreateBusinessInput = z.infer<typeof createBusinessSchema>;

/** Best-effort lat/lng extraction from Google Maps share URLs. */
export function parseMapsCoordinates(url: string): {
  lat: number | null;
  lng: number | null;
} {
  try {
    const decoded = decodeURIComponent(url);

    const atMatch = decoded.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
      return { lat: Number(atMatch[1]), lng: Number(atMatch[2]) };
    }

    const qMatch = decoded.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (qMatch) {
      return { lat: Number(qMatch[1]), lng: Number(qMatch[2]) };
    }

    const llMatch = decoded.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (llMatch) {
      return { lat: Number(llMatch[1]), lng: Number(llMatch[2]) };
    }

    const placeMatch = decoded.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (placeMatch) {
      return { lat: Number(placeMatch[1]), lng: Number(placeMatch[2]) };
    }
  } catch {
    // ignore
  }
  return { lat: null, lng: null };
}

export function slugifyBusinessName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
