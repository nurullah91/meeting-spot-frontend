import { z } from "zod";

export const bookingSchema = z.object({
  slots: z
    .array(z.string())
    .nonempty({ message: "Please select at least one slot." }),
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .regex(/^[0-9]+$/, "Phone number must contain only digits.")
    .min(10, "Phone number must be at least 10 digits."),
  address: z.string().optional(),
});
