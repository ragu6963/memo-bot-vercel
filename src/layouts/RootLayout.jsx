import { Outlet } from "react-router-dom";
import Header from "../components/Header";
export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Outlet />
    </div>
  );
}
