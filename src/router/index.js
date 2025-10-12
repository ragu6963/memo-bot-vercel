import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

import Home from "../pages/RootPages/Home";
import MemoCreate from "../pages/RootPages/MemoCreate";
import MemoList from "../pages/RootPages/MemoList";

import Login from "../pages/AuthPages/Login";
import Signup from "../pages/AuthPages/Signup";
import PATHS from "../constants/paths";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: PATHS.ROOT.INDEX,
        Component: Home,
      },
      {
        Component: ProtectedLayout,
        children: [
          {
            path: PATHS.ROOT.MEMO_CREATE,
            Component: MemoCreate,
          },
          {
            path: PATHS.ROOT.MEMO_LIST,
            Component: MemoList,
          },
        ],
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: PATHS.AUTH.LOGIN,
        Component: Login,
      },
      {
        path: PATHS.AUTH.SIGNUP,
        Component: Signup,
      },
    ],
  },
]);

// 라우터 내보내기
export default router;
