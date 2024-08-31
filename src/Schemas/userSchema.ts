import { z } from "zod";

// Define the Zod schema
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(1, "Address is required"),
});
// Define the Zod schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty(),
});
