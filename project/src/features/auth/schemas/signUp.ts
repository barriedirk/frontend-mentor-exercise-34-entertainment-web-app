import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords are different",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
