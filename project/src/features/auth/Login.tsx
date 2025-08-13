import "./Login.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  loginFormSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login";

import InputForm from "@/components/forms/fields/FormInput";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="login">
      <h1 id="login-heading" className="text-preset-1 mb-[40px]">
        Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="login-heading">
        <InputForm<LoginFormValues>
          name="email"
          control={control}
          label="Email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <InputForm<LoginFormValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
          autoComplete="password"
        />
        <button
          className="login__btn mt-[40px] text-preset-4 flex justify-center items-center"
          type="submit"
          aria-label="Log in to your account"
        >
          Login to your account
        </button>
      </form>

      <p className="text-preset-4 mt-[40px] flex justify-center items-center gap-2">
        <span className="text-white-custom">Don’t have an account?</span>
        <Link className="text-red-500" to="/signup" aria-label="Sign Up">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
