import { Alert, Input, Radio, RadioGroup } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import ValidationMessage from "../../../component/Layout/shared/ValidationMesage/ValidationMessage";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { registerSchema } from "../../../SchemaVali/register.schema";
import AppButton from "../../../component/Layout/shared/AppButton/AppButton";
import { Helmet } from "react-helmet";
import { useSubmit } from "../../../hooks/useSubmit";




/////////////////////////////////////////////// API URL
const API_URL = "https://route-posts.routemisr.com/users/signup";




export default function Register() {

 const { errorMessage, successMsg, submitForm } = useSubmit(API_URL, "/auth/login", {
  shouldSaveToken: false,
  successMessage: "Registration successful! Redirecting to login...",
 })

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields , isValid , isSubmitting},
    control,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "",
      dateOfBirth: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });
  // const [errorMessage, seterrorMessage] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");
  // // const [isLoading, setIsLoading] = useState(false)
  // const navigate = useNavigate();


  // let timeOutId;
  // // const passwordVal = getValues("password");

  // async function submitForm(data) {

  //   // console.log("Form submitted with data:", data);
  //   //  setIsLoading(true);
  //   try {
  //  const res = await axios.request({
  //     method: "post",
  //       headers: {
  //       "Content-Type": "application/json"
  //     },
  //     url: API_URL,
  //     data: data 
  //  })
  //     // console.log("API response:", res);
  //   if(res.error){
  //     throw new Error(res.error);
  //   }else{
  //     setSuccessMsg("Registration successful! Redirecting to login...");
  //    timeOutId = setTimeout(() => {
  //       navigate("/auth/login");
  //     }, 2000);
  //     // Handle successful registration ( show a success message, redirect, etc.)
  //   }


  //   } catch (error) {
  //     // console.log(error.response.data.error);
  //     seterrorMessage(error.response.data.error);
  //   }
            
  //   finally{
  //     // setIsLoading(false);
  //   }

  // }


  // //clear setTImeout
  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timeOutId);
  //   }
  // }, [])
  
  return (
    <>
    <Helmet>
      <title>Signup</title>
    </Helmet>
      <section className="app-section auth-shell">
        <div className="page-hero text-center">
          <span className="headline-badge">Create Account</span>
          <h1 className="page-title mt-2">Join Social App</h1>
          <p className="page-subtitle">Set up your account and start posting in minutes.</p>
        </div>
        <div className="surface-card max-w-xl mx-auto p-5 sm:p-7 rounded-2xl space-y-5">
          {errorMessage && <Alert color="danger" title={`Error: ${errorMessage}`} />}
          {successMsg && <Alert color="success" title={`Success: ${successMsg}`} />}
          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-4 py-2"
          >
            <Input
              label="Name"
              type="text"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#fbfefd] border border-[#d6e8e1] shadow-none rounded-xl data-[hover=true]:border-[#b8d9ce]",
              }}
              {...register("name")}
            />

            <ValidationMessage
              field={errors.name}
              isTouched={touchedFields.name}
            />
            <Input
              label="Email"
              type="text"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#fbfefd] border border-[#d6e8e1] shadow-none rounded-xl data-[hover=true]:border-[#b8d9ce]",
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
                  "bg-[#fbfefd] border border-[#d6e8e1] shadow-none rounded-xl data-[hover=true]:border-[#b8d9ce]",
              }}
              {...register("password")}
            />
            <ValidationMessage
              field={errors.password}
              isTouched={touchedFields.password}
            />
            <Input
              label="Confirm password"
              type="password"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#fbfefd] border border-[#d6e8e1] shadow-none rounded-xl data-[hover=true]:border-[#b8d9ce]",
              }}
              {...register("rePassword")}
            />
            <ValidationMessage
              field={errors.rePassword}
              isTouched={touchedFields.rePassword}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <RadioGroup
                  label="Select your Gender"
                  classNames={{ label: "text-[#21453e] font-semibold" }}
                  {...field}
                >
                  <Radio value="male"> Male </Radio>
                  <Radio value="female"> Female </Radio>
                </RadioGroup>
              )}
            />
            <ValidationMessage
              field={errors.gender}
              isTouched={touchedFields.gender || true}
            />

            <Input
              label="Date of Birth"
              type="date"
              variant="bordered"
              classNames={{
                inputWrapper:
                  "bg-[#fbfefd] border border-[#d6e8e1] shadow-none rounded-xl data-[hover=true]:border-[#b8d9ce]",
              }}
              {...register("dateOfBirth")}
            />
            <ValidationMessage
              field={errors.dateOfBirth}
              isTouched={touchedFields.dateOfBirth}
            />
            <AppButton type="submit" disabled={!isValid} isLoading={isSubmitting} >
              Register
            </AppButton>
            
             <Link to="/auth/login" className="inline-link block mt-2">
            Already have an account? Login here
          </Link>
          
          </form>
         
        </div>
      </section>
    </>
  );
}
