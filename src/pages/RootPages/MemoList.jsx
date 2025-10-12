import React, { useState, useEffect, useMemo } from "react";
import Momo from "../../components/Momo";

export default function MemoList() {
  const [memos, setMemos] = useState([]);
  const [filter, setFilter] = useState("all"); // all, completed, pending

  useEffect(() => {
    loadMemos();
  }, []);

  const loadMemos = () => {
    const storedMemos = JSON.parse(localStorage.getItem("memos") || "[]");
    setMemos(storedMemos);
  };

  const deleteMemo = (id) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);

    setMemos(updatedMemos);

    localStorage.setItem("memos", JSON.stringify(updatedMemos));
  };

  const updateMemoCompletion = (id, isCompleted) => {
    const updatedMemos = memos.map((memo) => {
      if (memo.id === id) {
        return { ...memo, isCompleted };
      }
      return memo;
    });

    setMemos(updatedMemos);

    localStorage.setItem("memos", JSON.stringify(updatedMemos));
  };

  const filteredMemos = useMemo(() => {
    switch (filter) {
      case "completed":
        return memos.filter((memo) => memo.isCompleted);
      case "pending":
        return memos.filter((memo) => !memo.isCompleted);
      default:
        return memos;
    }
  }, [memos, filter]);

  const memoCounts = useMemo(() => {
    const completed = memos.filter((memo) => memo.isCompleted).length;
    const pending = memos.filter((memo) => !memo.isCompleted).length;
    return {
      all: memos.length,
      completed,
      pending,
    };
  }, [memos]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto p-6">
        {/* 필터 버튼 */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm font-medium border cursor-pointer ${
              filter === "all"
                ? "text-white bg-gray-900 border-gray-900"
                : "text-gray-600 bg-white border-gray-300"
            }`}
          >
            전체 ({memoCounts.all})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 text-sm font-medium border cursor-pointer ${
              filter === "pending"
                ? "text-white bg-gray-900 border-gray-900"
                : "text-gray-600 bg-white border-gray-300"
            }`}
          >
            미완료 ({memoCounts.pending})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 text-sm font-medium border cursor-pointer ${
              filter === "completed"
                ? "text-white bg-gray-900 border-gray-900"
                : "text-gray-600 bg-white border-gray-300"
            }`}
          >
            완료 ({memoCounts.completed})
          </button>
        </div>

        {filteredMemos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {filter === "all"
                ? "아직 메모가 없습니다"
                : filter === "completed"
                ? "완료된 메모가 없습니다"
                : "미완료 메모가 없습니다"}
            </h3>
            <p className="text-gray-600">
              {filter === "all"
                ? "메모 작성 페이지에서 새로운 할 일을 만들어보세요."
                : "다른 필터를 선택해보세요."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredMemos.map((memo) => (
              <Momo
                key={memo.id}
                memo={memo}
                onDelete={deleteMemo}
                onCompletionUpdate={updateMemoCompletion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
