import "./AuthLayout.css";

import { Outlet } from "react-router-dom";

import useChangeBodyStyle from "@/hooks/useChangeBodyStyle";

import Header from "./Header";

export default function AuthLayout() {
  useChangeBodyStyle("background-color: var(--clr-blue-950);");

  return (
    <div className="auth-wrapper">
      <Header />
      <main className="auth-layout">
        <Outlet />
      </main>
    </div>
  );
}
