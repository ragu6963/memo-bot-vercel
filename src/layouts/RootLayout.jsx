import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import useErrorClearer from "../hooks/useErrorClearer";

export default function RootLayout() {
  useErrorClearer();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Outlet />
    </div>
  );
}
