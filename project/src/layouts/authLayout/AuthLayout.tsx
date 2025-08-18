import "./AuthLayout.css";

import { Outlet } from "react-router-dom";

import useChangeBodyStyle from "@/hooks/useChangeBodyStyle";

import { Loading } from "@/components/loading/Loading";

import Header from "./Header";
import Footer from "./Footer";

export default function AuthLayout() {
  useChangeBodyStyle("background-color: var(--clr-blue-950);");

  return (
    <>
      <Loading />
      <div className="auth-wrapper">
        <Header />
        <main className="auth-layout">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
