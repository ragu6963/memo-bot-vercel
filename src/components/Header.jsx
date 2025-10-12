import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import PATHS from "../constants/paths";

export default function Header() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-gray-50 border-b border-gray-300 p-4">
      <div className="flex items-center gap-4">
        <Link
          className="text-gray-900 font-extrabold text-xl cursor-pointer"
          to={PATHS.ROOT.INDEX}
        >
          Memo AI
        </Link>
        <Link
          className="text-gray-600 px-3 py-2 cursor-pointer"
          to={PATHS.ROOT.MEMO_CREATE}
        >
          메모 작성
        </Link>
        <Link
          className="text-gray-600 px-3 py-2 cursor-pointer"
          to={PATHS.ROOT.MEMO_LIST}
        >
          메모 목록
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {token ? (
          <button
            className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            로그아웃
          </button>
        ) : (
          <>
            <Link
              className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 cursor-pointer"
              to={PATHS.AUTH.LOGIN}
            >
              로그인
            </Link>
            <Link
              className="px-3 py-2 text-sm font-medium text-white bg-gray-600 cursor-pointer"
              to={PATHS.AUTH.SIGNUP}
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
