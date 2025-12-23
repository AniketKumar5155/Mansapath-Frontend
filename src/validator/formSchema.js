import { z } from "zod";

export const formSubmissionSchema = z.object({
  first_name: z
    .string({ required_error: "First name is required" })
    .min(1, "First name cannot be empty")
    .max(50, "First name must be at most 50 characters"),

  middle_name: z.string().max(50).optional(),

  last_name: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name cannot be empty")
    .max(50, "Last name must be at most 50 characters"),

  gender: z.enum(["MALE", "FEMALE", "OTHER", "RATHER NOT SAY"], {
    required_error: "Gender is required",
  }),

  age: z
    .number({ required_error: "Age is required" })
    .int("Age must be an integer")
    .min(1, "Age must be at least 1")
    .max(120, "Age cannot be greater than 120"),

  email: z.string().email("Invalid email format").max(100).optional(),

  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[0-9+\-() ]{7,15}$/, "Invalid phone number format"),

  address: z
    .string({ required_error: "Address is required" })
    .min(1)
    .max(300),

  problem_description: z.string().max(2000).optional(),

  status: z.enum([
    "PENDING",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
    "OPEN",
  ]),

  category: z.enum([
    "MENTAL FITNESS",
    "MENTAL THERAPY",
    "CHAITAINYA",
  ]),
});
export const formUpdateSchema = formSubmissionSchema.partial();
