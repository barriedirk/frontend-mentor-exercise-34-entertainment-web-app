import { Outlet } from "react-router-dom";
import clsx from "clsx";

import styles from "./MainLayout.module.css";

import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className={clsx(styles["ml"])}>
      <Header className={clsx(styles["ml__header"])} />
      <main className={clsx(styles["ml__main"])}>
        <Outlet />
      </main>
      <Footer className={clsx(styles["ml_footer"])} />
    </div>
  );
}
