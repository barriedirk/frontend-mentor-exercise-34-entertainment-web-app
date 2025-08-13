import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return false;
  // @todo, replace it with React context or state from a global store
  // return !!localStorage.getItem("token"); // or use a context/global state
};

function AuthGuard() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthGuard;
