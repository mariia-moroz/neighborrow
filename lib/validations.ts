import * as z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().regex(/^\S+@\S+\.\S+$/, "Please provide a valid email address"),
  address: z.string().min(3),
  password: z.string().min(8),
  idConfirmation: z.string().nonempty("ID is required"),
});

export const signInSchema = z.object({
  email: z.string().regex(/^\S+@\S+\.\S+$/, "Please provide a valid email address"),
  password: z.string().min(8),
});

export const itemSchema = z.object({
  title: z.string().trim().min(2).max(100),
  category: z.string().trim().min(2).max(50),
  rating: z.coerce.number<string | number>().min(1).max(5),
  totalItems: z.coerce.number<string | number>().int().positive().lte(1000),
  summary: z.string().trim().min(10).max(10000),
  description: z.string().trim().min(10).max(10000),
  image: z.string().nonempty(),
  condition: z.string().trim().min(2).max(50),
  included: z.string().trim().min(2).max(10000),
  brand: z.string().trim().min(2).max(50),
  borrowDuration: z.coerce.number<string | number>().min(1).max(365),
});
