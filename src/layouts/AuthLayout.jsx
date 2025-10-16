import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PATHS from "../constants/paths";
import useErrorClearer from "../hooks/useErrorClearer";

export default function AuthLayout() {
  const { token } = useSelector((state) => state.auth);

  useErrorClearer();

  if (token) {
    return <Navigate to={PATHS.ROOT.INDEX} replace />;
  }

  return <Outlet />;
}
