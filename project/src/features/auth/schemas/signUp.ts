import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z.email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords are different",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
