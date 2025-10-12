// API 모듈들을 한 곳에서 관리
import memoAPI from "./memos.js";
import aiAPI from "./ai.js";

// 모든 API를 하나의 객체로 export
const api = {
  memo: memoAPI,
  ai: aiAPI,
};

export default api;
