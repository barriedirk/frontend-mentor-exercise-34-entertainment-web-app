import "./Login.css";

import { useEffect } from "react";

import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  loginFormSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login";

import InputForm from "@/components/forms/fields/FormInput";

import { useFocusFirstInput } from "@/hooks/useFocusFirstInput";
import { useApi } from "@/hooks/useApi";
import { login, type RegresResponse } from "@/api/reqres";

export default function Login() {
  const containerRef = useFocusFirstInput<HTMLFormElement>();

  const {
    loading: loadingApi,
    error: errorApi,
    data: responseApi,
    fetch: fetchApi,
  } = useApi<RegresResponse, [string, string]>(login, {
    autoFetch: false,
    params: ["", ""],
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!loadingApi && !errorApi) {
      console.log({ responseApi });
    }
  }, [loadingApi, errorApi, responseApi]);

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("Submit form data:", data);

    fetchApi([data.email, data.password]);
  };

  return (
    <>
      {loadingApi && <p>... verify credentials ...</p>}
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
      </div>

      {errorApi && (
        <p className="text-red-500 text-preset-4">
          There is an error with the credentials: {String(errorApi)}
        </p>
      )}
    </>
  );
}
