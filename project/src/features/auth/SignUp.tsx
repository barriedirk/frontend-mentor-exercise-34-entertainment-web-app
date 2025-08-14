import "./SignUp.css";

import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  signUpFormSchema,
  type SignUpFormValues,
} from "@/features/auth/schemas/signUp";

import InputForm from "@/components/forms/fields/FormInput";
import { useFocusFirstInput } from "@/hooks/useFocusFirstInput";

function SignUp() {
  const containerRef = useFocusFirstInput<HTMLFormElement>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="signup">
      <h1 id="signup-heading" className="text-preset-1 mb-[40px]">
        Sign Up
      </h1>
      <form
        ref={containerRef}
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="signup-heading"
      >
        <InputForm<SignUpFormValues>
          name="email"
          control={control}
          label="Email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <InputForm<SignUpFormValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
          autoComplete="password"
        />
        <InputForm<SignUpFormValues>
          name="confirmPassword"
          control={control}
          label="Repeat Password"
          type="password"
          error={errors.confirmPassword}
          autoComplete="confirmPassword"
        />
        <button
          className="btn--submit mt-[40px] text-preset-4 flex justify-center items-center"
          type="submit"
          aria-label="Create your account"
        >
          Create an account
        </button>
      </form>

      <p className="text-preset-4 mt-[20px] flex justify-center items-center gap-2">
        <span className="text-white-custom">Already have an account?</span>
        <Link className="text-red-500" to="/login" aria-label="Sign Up">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
