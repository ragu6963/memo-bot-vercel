import axios from "axios";

// AI 관련 API 함수들
export const aiAPI = {
  // 메모 생성 AI 응답 요청
  async generateMemo(message) {
    try {
      const response = await axios.post("/api/ai/generate-memo", {
        message: message,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("AI 메모 생성 실패:", error);
      return {
        success: false,
        error: error.message || "AI 메모 생성 중 오류가 발생했습니다.",
      };
    }
  },
};

export default aiAPI;
