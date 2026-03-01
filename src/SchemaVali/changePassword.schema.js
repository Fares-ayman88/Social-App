import * as zod from "zod";

const passwordRule = zod
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    "Password must be 8+ characters with uppercase, lowercase, number and special character.",
  );

export const changePasswordSchema = zod
  .object({
    currentPassword: passwordRule,
    newPassword: passwordRule,
    confirmNewPassword: passwordRule,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmNewPassword"],
  });
