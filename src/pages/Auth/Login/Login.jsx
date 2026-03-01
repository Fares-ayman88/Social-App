import { Alert, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import ValidationMessage from "../../../component/Layout/shared/ValidationMesage/ValidationMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { LoginSchema } from "../../../SchemaVali/Login.Schema";
import AppButton from "../../../component/Layout/shared/AppButton/AppButton";
import { Helmet } from "react-helmet";
import { useSubmit } from "../../../hooks/useSubmit";
/////////////////////////////////////////////// API URL
const API_URL = "https://route-posts.routemisr.com/users/signin";

export default function Login() {
  const { errorMessage, successMsg, submitForm } = useSubmit(API_URL, "/", {
    shouldSaveToken: true,
    successMessage: "Logged in successfully! Redirecting to home...",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="app-section auth-shell">
        <div className="page-hero text-center">
          <span className="headline-badge">Welcome</span>
          <h1 className="page-title mt-2">Sign in to continue</h1>
          <p className="page-subtitle">Access your feed, profile, and settings.</p>
        </div>

        <div className="surface-card max-w-xl mx-auto p-5 sm:p-7 rounded-2xl space-y-5">
          {errorMessage && (
            <Alert color="danger" title={`Error: ${errorMessage}`} />
          )}
          {successMsg && (
            <Alert color="success" title={`Success: ${successMsg}`} />
          )}
          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-4 py-2"
          >
            <Input
              label="Email"
              type="text"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#f8fbff] border border-[#d3e2fa] shadow-none rounded-xl data-[hover=true]:border-[#b4cbf2]",
              }}
              {...register("email")}
            />

            <ValidationMessage
              field={errors.email}
              isTouched={touchedFields.email}
            />
            <Input
              label="Password"
              type="password"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#f8fbff] border border-[#d3e2fa] shadow-none rounded-xl data-[hover=true]:border-[#b4cbf2]",
              }}
              {...register("password")}
            />
            <ValidationMessage
              field={errors.password}
              isTouched={touchedFields.password}
            />
            <AppButton
              className="w-full"
              color="primary"
              type="submit"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              Login
            </AppButton>
            <Link
              to="/auth/register"
              className="inline-link block mt-2"
            >
              Don't have an account? Register here
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
