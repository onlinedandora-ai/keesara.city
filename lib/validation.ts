import { z } from "zod";

export const createNewsPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  body: z.string().min(20, "Please add more detail (at least 20 characters)").max(5000),
});

export const validationSchema = z.object({
  newsPostId: z.string().uuid(),
  type: z.enum(["confirm", "dispute"]),
});

export type CreateNewsPostInput = z.infer<typeof createNewsPostSchema>;
export type ValidationInput = z.infer<typeof validationSchema>;
