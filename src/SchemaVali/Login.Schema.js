import * as zod from "zod";

export const LoginSchema = zod.object({
 
  email: zod.email("Please enter a valid email address"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must be 8+ characters with uppercase, lowercase, number and special character.",
    ),
});