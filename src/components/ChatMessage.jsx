export default function ChatMessage({ message, onSave, onCancel }) {
  const isUser = message["role"] === "user";
  const hasStructuredData = message.structuredData;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "높음":
        return "text-red-600 bg-red-50";
      case "중간":
        return "text-yellow-600 bg-yellow-50";
      case "낮음":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className={`mb-6 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {isUser ? (
        <div className="px-4 py-3 bg-indigo-600 text-white max-w-[80%]">
          {message.content}
        </div>
      ) : (
        <div className="max-w-[80%]">
          <div className="px-4 py-3 bg-gray-100 text-gray-700 mb-3">
            {message.content}
          </div>
          {hasStructuredData && (
            <div className="bg-white border border-gray-300 p-4 mb-3">
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">할 일 내용</label>
                  <p className="text-gray-900">
                    {message.structuredData.content}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">마감 날짜</label>
                  <p className="text-gray-900">
                    {message.structuredData.dueDate}
                  </p>
                </div>

                {message.structuredData.priority && (
                  <div>
                    <label className="text-sm text-gray-600">우선순위</label>
                    <span
                      className={`inline-block px-2 py-1 text-sm  ${getPriorityColor(
                        message.structuredData.priority
                      )}`}
                    >
                      {message.structuredData.priority}
                    </span>
                  </div>
                )}

                {message.structuredData.category && (
                  <div>
                    <label className="text-sm text-gray-600">카테고리</label>
                    <p className="text-gray-900">
                      {message.structuredData.category}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={onSave}
                  className="px-4 py-2 text-sm text-white bg-indigo-600 cursor-pointer"
                >
                  생성하기
                </button>
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
