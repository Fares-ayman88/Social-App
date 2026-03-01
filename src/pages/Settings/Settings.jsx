import { Alert, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { useState } from "react";
import AppButton from "../../component/Layout/shared/AppButton/AppButton";
import ValidationMessage from "../../component/Layout/shared/ValidationMesage/ValidationMessage";
import { changePasswordSchema } from "../../SchemaVali/changePassword.schema";
import { changePassword } from "../../services/auth.service";

export default function Settings() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting, isValid },
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });

  async function handleChangePassword(data) {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await changePassword({
        password: data.currentPassword,
        newPassword: data.newPassword,
      });

      setSuccessMessage("Password changed successfully.");
      reset();
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to change password.";
      setErrorMessage(message);
    }
  }

  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <section className="app-section auth-shell">
        <div className="page-hero text-center">
          <span className="headline-badge">Account</span>
          <h1 className="page-title mt-2">Settings</h1>
          <p className="page-subtitle">Keep your account secure by updating your password regularly.</p>
        </div>
        <div className="surface-card max-w-xl mx-auto p-5 sm:p-7 rounded-2xl space-y-5">
          <h3 className="text-xl font-semibold mb-2 text-[#1a2d52]">Change Password</h3>

          {errorMessage && <Alert color="danger" title={`Error: ${errorMessage}`} />}
          {successMessage && (
            <Alert color="success" title={`Success: ${successMessage}`} />
          )}

          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="space-y-4 py-2"
          >
            <Input
              label="Current Password"
              type="password"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#f8fbff] border border-[#d3e2fa] shadow-none rounded-xl data-[hover=true]:border-[#b4cbf2]",
              }}
              {...register("currentPassword")}
            />
            <ValidationMessage
              field={errors.currentPassword}
              isTouched={touchedFields.currentPassword}
            />

            <Input
              label="New Password"
              type="password"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#f8fbff] border border-[#d3e2fa] shadow-none rounded-xl data-[hover=true]:border-[#b4cbf2]",
              }}
              {...register("newPassword")}
            />
            <ValidationMessage
              field={errors.newPassword}
              isTouched={touchedFields.newPassword}
            />

            <Input
              label="Confirm New Password"
              type="password"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#f8fbff] border border-[#d3e2fa] shadow-none rounded-xl data-[hover=true]:border-[#b4cbf2]",
              }}
              {...register("confirmNewPassword")}
            />
            <ValidationMessage
              field={errors.confirmNewPassword}
              isTouched={touchedFields.confirmNewPassword}
            />

            <AppButton
              type="submit"
              className="w-full"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              Update Password
            </AppButton>
          </form>
        </div>
      </section>
    </>
  );
}
