import axiosInstance from "../src/api/index.js";

// 메모 데이터 변환 함수들
const transformMemoFromSupabase = (memo) => ({
  id: memo.id.toString(),
  title: memo.title,
  description: memo.description,
  priority: memo.priority,
  dueDate: memo.due_date,
  createdAt: memo.created_at,
  isCompleted: memo.is_completed,
});

const transformMemoToSupabase = (memo) => ({
  title: memo.title,
  description: memo.description,
  priority: memo.priority,
  due_date: memo.dueDate,
  is_completed: memo.isCompleted,
  created_at: memo.createdAt,
});

// 메모 API 함수들
const memoAPI = {
  // 모든 메모 조회
  async getAllMemos() {
    try {
      const response = await axiosInstance.get("/rest/v1/todo", {
        params: {
          select: "*",
          order: "created_at.desc",
        },
      });

      return {
        success: true,
        data: response.data.map(transformMemoFromSupabase),
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
      const supabaseData = transformMemoToSupabase({
        ...memoData,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      });

      const response = await axiosInstance.post("/rest/v1/todo", supabaseData, {
        headers: {
          Prefer: "return=representation",
        },
      });

      return {
        success: true,
        data: transformMemoFromSupabase(response.data[0]),
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
      await axiosInstance.delete(`/rest/v1/todo?id=eq.${id}`);

      return {
        success: true,
        data: { id },
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
      await axiosInstance.patch(`/rest/v1/todo?id=eq.${id}`, {
        is_completed: isCompleted,
      });

      return {
        success: true,
        data: { id, isCompleted },
      };
    } catch (error) {
      console.error("메모 완료 상태 업데이트 실패:", error);
      return {
        success: false,
        error: error.message || "메모 상태 업데이트 중 오류가 발생했습니다.",
      };
    }
  },

  // 메모 업데이트 (전체)
  async updateMemo(id, updateData) {
    try {
      const supabaseData = transformMemoToSupabase(updateData);

      await axiosInstance.patch(`/rest/v1/todo?id=eq.${id}`, supabaseData);

      return {
        success: true,
        data: { id, ...updateData },
      };
    } catch (error) {
      console.error("메모 업데이트 실패:", error);
      return {
        success: false,
        error: error.message || "메모 업데이트 중 오류가 발생했습니다.",
      };
    }
  },
};
export default memoAPI;
