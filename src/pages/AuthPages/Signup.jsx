import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signup } from "../../store/authSlice";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    dispatch(signup({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            회원가입
          </h2>
          <p className="text-sm text-gray-600">새 계정을 만들어보세요</p>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700">
              {error.message || "회원가입에 실패했습니다."}
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
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
            />
            <button
              type="submit"
              className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 cursor-pointer"
            >
              회원가입
            </button>
            <Link
              to={PATHS.AUTH.LOGIN}
              className="py-2 px-4 text-sm font-medium text-white bg-gray-600 text-center cursor-pointer"
            >
              로그인
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
