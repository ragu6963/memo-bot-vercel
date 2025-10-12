import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PATHS from "../constants/paths";

export default function AuthLayout() {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to={PATHS.ROOT.INDEX} replace />;
  }

  return <Outlet />;
}
