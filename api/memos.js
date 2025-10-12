import axiosInstance from "../src/api/index.js";

// 메모 데이터 변환 함수들
const supabaseToResponseData = (supabaseData) => ({
  id: supabaseData.id.toString(),
  content: supabaseData.content,
  priority: supabaseData.priority,
  dueDate: supabaseData.due_date,
  category: supabaseData.category,
  createdAt: supabaseData.created_at,
  isCompleted: supabaseData.is_completed,
});

const requestToSupabaseData = (requestData) => ({
  content: requestData.content,
  priority: requestData.priority,
  category: requestData.category,
  due_date: requestData.dueDate,
  is_completed: requestData.isCompleted,
});

// 메모 API 함수들
const memoAPI = {
  // 모든 메모 조회
  async getAllMemos() {
    try {
      const config = {
        method: "GET",
        url: "/rest/v1/todo",
        params: {
          select: "*",
          order: "created_at.desc",
        },
      };

      const response = await axiosInstance(config);

      return {
        success: true,
        data: response.data.map(supabaseToResponseData),
      };
    } catch (error) {
      console.error("메모 조회 실패:", error);
      return {
        success: false,
        error: error.message || "메모 조회 중 오류가 발생했습니다.",
      };
    }
  },

  // 메모 생성
  async createMemo(memoData) {
    try {
      const supabaseData = requestToSupabaseData({
        ...memoData,
        isCompleted: false,
      });

      const config = {
        method: "POST",
        url: "/rest/v1/todo",
        data: supabaseData,
      };

      await axiosInstance(config);

      return {
        success: true,
      };
    } catch (error) {
      console.error("메모 생성 실패:", error);
      return {
        success: false,
        error: error.message || "메모 생성 중 오류가 발생했습니다.",
      };
    }
  },

  // 메모 삭제
  async deleteMemo(id) {
    try {
      const config = {
        method: "DELETE",
        url: `/rest/v1/todo?id=eq.${id}`,
      };
      await axiosInstance(config);

      return {
        success: true,
      };
    } catch (error) {
      console.error("메모 삭제 실패:", error);
      return {
        success: false,
        error: error.message || "메모 삭제 중 오류가 발생했습니다.",
      };
    }
  },

  // 메모 완료 상태 업데이트
  async updateMemoCompletion(id, isCompleted) {
    try {
      const config = {
        method: "PATCH",
        url: `/rest/v1/todo?id=eq.${id}`,
        data: {
          is_completed: isCompleted,
        },
      };

      await axiosInstance(config);

      return {
        success: true,
      };
    } catch (error) {
      console.error("메모 완료 상태 업데이트 실패:", error);
      return {
        success: false,
        error: error.message || "메모 상태 업데이트 중 오류가 발생했습니다.",
      };
    }
  },
};
export default memoAPI;
