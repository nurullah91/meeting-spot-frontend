import { z } from "zod";

const createRoomSchema = z.object({
  name: z.string().min(1, "Room name is required"),

  roomNo: z
    .string()
    .nonempty("Room number is required")
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Room number must be a positive number",
    }),

  floorNo: z
    .string()
    .nonempty("Floor number is required")
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Floor number must be a positive number",
    }),

  capacity: z
    .string()
    .nonempty("Capacity is required")
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Capacity must be a positive number",
    }),

  pricePerSlot: z
    .string()
    .nonempty("Price per slot is required")
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Price per slot must be a positive number",
    }),

  amenities: z
    .string()
    .nonempty("At least one amenity is required")
    .transform((value) =>
      value
        .split(",")
        .map((amenity) => amenity.trim())
        .filter((amenity) => amenity.trim().length > 0)
    ),

  img: z.custom<File>((file) => file instanceof File && file.size > 0, {
    message: "Main image file is required",
  }),

  detailImages: z
    .array(
      z.custom<File>((file) => file instanceof File && file.size > 0, {
        message: "Each detail image must be a valid file",
      })
    )
    .nonempty("At least one detail image is required"),
});

const updateRoomSchema = z.object({
  name: z.string().min(1, "Room name is required").optional(),

  roomNo: z
    .string()
    .nonempty("Room number is required")
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Room number must be a positive number",
    })
    .optional(),

  floorNo: z
    .string()
    .nonempty("Floor number is required")
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Floor number must be a positive number",
    })
    .optional(),

  capacity: z
    .string()
    .nonempty("Capacity is required")
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Capacity must be a positive number",
    })
    .optional(),

  pricePerSlot: z
    .string()
    .nonempty("Price per slot is required")
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Price per slot must be a positive number",
    })
    .optional(),

  amenities: z
    .string()
    .transform((value) =>
      value
        .split(",")
        .map((amenity) => amenity.trim())
        .filter((amenity) => amenity.trim().length > 0)
    )
    .optional(),

  img: z
    .custom<File>((file) => file instanceof File && file.size > 0, {
      message: "Main image file is required",
    })
    .optional(),

  detailImages: z
    .array(
      z.custom<File>((file) => file instanceof File && file.size > 0, {
        message: "Each detail image must be a valid file",
      })
    )
    .optional(),
});

export const roomSchema = {
  createRoomSchema,
  updateRoomSchema,
};
