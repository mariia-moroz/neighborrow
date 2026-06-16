import * as z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().regex(/^\S+@\S+\.\S+$/, "Please provide a valid email address"),
  address: z.string().min(3),
  password: z.string().min(8),
  IdConfirmation: z.string().nonempty("ID is required"),
});

export const signInSchema = z.object({
  email: z.string().regex(/^\S+@\S+\.\S+$/, "Please provide a valid email address"),
  password: z.string().min(8),
});
