import React from "react";

export default function Momo({ memo, onDelete, onCompletionUpdate }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "높음":
        return "text-red-600 bg-red-50 border-red-200";
      case "중간":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "낮음":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getCompletionColor = (isCompleted) => {
    return isCompleted
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getCompletionText = (isCompleted) => {
    return isCompleted ? "완료" : "미완료";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-300 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {memo.content}
          </h3>

          <div className="flex flex-wrap gap-2 mb-3">
            {memo.priority && (
              <span
                className={`inline-block px-2 py-1 text-sm font-medium border ${getPriorityColor(
                  memo.priority
                )}`}
              >
                우선순위: {memo.priority}
              </span>
            )}

            <span
              className={`inline-block px-2 py-1 text-sm font-medium border ${getCompletionColor(
                memo.isCompleted
              )}`}
            >
              {getCompletionText(memo.isCompleted)}
            </span>

            {memo.category && (
              <span className="inline-block px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-200">
                {memo.category}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(memo.id)}
          className="text-red-500 cursor-pointer"
        >
          삭제
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">마감일:</span>
          <span>{formatDate(memo.dueDate)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">생성일:</span>
          <span>{formatDate(memo.createdAt)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onCompletionUpdate(memo.id, !memo.isCompleted)}
          className={`px-3 py-1 text-sm font-medium border cursor-pointer ${
            memo.isCompleted
              ? "text-gray-600 bg-gray-50 border-gray-200"
              : "text-green-600 bg-green-50 border-green-200"
          }`}
        >
          {memo.isCompleted ? "미완료로 변경" : "완료로 변경"}
        </button>
      </div>
    </div>
  );
}
