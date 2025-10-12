import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PATHS from "../constants/paths";

export default function ProtectedLayout() {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={PATHS.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
}
