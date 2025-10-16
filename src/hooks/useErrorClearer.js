import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError } from "../store/authSlice";

/**
 * 라우트 변경 시 에러를 자동으로 초기화하는 커스텀 훅
 */
export default function useErrorClearer() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [location.pathname, dispatch]);
}
