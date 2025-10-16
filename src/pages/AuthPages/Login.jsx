import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../store/authSlice";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">로그인</h2>
          <p className="text-sm text-gray-600">계정에 로그인하세요</p>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700">
              {error.msg || "로그인에 실패했습니다."}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
            />
            <button
              type="submit"
              className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 cursor-pointer"
            >
              로그인
            </button>
            <Link
              to={PATHS.AUTH.SIGNUP}
              className="py-2 px-4 text-sm font-medium text-white bg-gray-600 text-center cursor-pointer"
            >
              회원가입
            </Link>
            <Link
              to={PATHS.ROOT.INDEX}
              className="py-2 px-4 text-sm font-medium text-white bg-green-600 text-center cursor-pointer"
            >
              처음으로
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
