import * as zod from "zod";

export const registerSchema = zod.object({
  name: zod
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be less than 20 characters"),
  email: zod.email("Please enter a valid email address"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must be 8+ characters with uppercase, lowercase, number and special character.",
    ),
  rePassword: zod
    .string()
    .min(8, "Confirm Password must be at least 8 characters long")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Confirm Password must be 8+ characters with uppercase, lowercase, number and special character.",
    ),
  dateOfBirth: zod.coerce.date().refine(function(val){
    return new Date().getFullYear() - val.getFullYear() >= 16? true : false;
  }, "Age must be at least 16 years")
  .transform(function(date){
    return `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`;
  })
  
  
  ,
  gender: zod.enum(["male", "female"], "Please select a gender"),
}).refine((data) => data.password === data.rePassword ? true:false, {
  message: "Passwords do not match",
  path: ["rePassword"],
});