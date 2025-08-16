import "./Login.css";

import { useState } from "react";
import { supabase } from "@/api/supabase";

import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  loginFormSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login";

import InputForm from "@/components/forms/fields/FormInput";

import { useFocusFirstInput } from "@/hooks/useFocusFirstInput";

export default function Login() {
  const [errorApi, setErrorApi] = useState<string>();
  const navigate = useNavigate();
  const containerRef = useFocusFirstInput<HTMLFormElement>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.session) {
      navigate("/");
    }

    if (error) {
      setErrorApi(error?.message);
    }
  };

  const loginWithDemoCredential = () => {
    onSubmit({
      email: "demo-entertainment-web-app@fakeemail.com",
      password: "3nT3rt4inMen1",
    });
  };

  return (
    <>
      <div className="login">
        <h1 id="login-heading" className="text-preset-1 mb-[40px]">
          Login
        </h1>
        <form
          ref={containerRef}
          onSubmit={handleSubmit(onSubmit)}
          aria-labelledby="login-heading"
        >
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
            className="btn--submit mt-[40px] text-preset-4 flex justify-center items-center"
            type="button"
            aria-label="Log in to your account"
            disabled={!isValid || isSubmitting}
          >
            Login to your account
          </button>
        </form>

        <p className="text-preset-4 mt-[20px] flex justify-center items-center gap-2">
          <span className="text-white-custom">Don’t have an account?</span>
          <Link className="text-red-500" to="/signup" aria-label="Sign Up">
            Sign Up
          </Link>
        </p>
        <div className="text-preset-5 mt-[20px] flex justify-center items-center gap-2 text-white-custom">
          <span>Use</span>
          <button
            type="button"
            className="text-red-500 underline"
            aria-label="Login with demo credentials"
            onClick={() => loginWithDemoCredential()}
          >
            Login Credentials
          </button>
          <span>to explore the demo.</span>
        </div>
      </div>

      {errorApi && (
        <p className="text-red-500 text-preset-4">
          There is an error with the credentials: {String(errorApi)}
        </p>
      )}
    </>
  );
}
