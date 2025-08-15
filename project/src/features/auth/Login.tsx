import "./Login.css";

import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  loginFormSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login";

import InputForm from "@/components/forms/fields/FormInput";

import { useFocusFirstInput } from "@/hooks/useFocusFirstInput";

import { supabase } from "@/api/supabase";

export default function Login() {
  const navigate = useNavigate();
  const containerRef = useFocusFirstInput<HTMLFormElement>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
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

    console.log({ error, data });
  };

  const loginWithDemoCredential = () => {
    onSubmit({ email: "demobarrie@fakeemail.com", password: "3nT3rt4inMen1" });
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
            type="submit"
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
        <p className="text-preset-4 mt-[20px] flex justify-center items-center gap-2">
          <span className="text-white-custom">
            If you don't want to play with login/signup and go directly
          </span>
          <button
            className="text-red-500"
            aria-label="Sign Up"
            onClick={() => loginWithDemoCredential()}
          >
            you can use the Demo Credentials
          </button>
        </p>
      </div>

      {/* {errorApi && (
        <p className="text-red-500 text-preset-4">
          There is an error with the credentials: {String(errorApi)}
        </p>
      )} */}
    </>
  );
}
