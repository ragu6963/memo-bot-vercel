import { useState, useRef, useEffect } from "react";
import ChatMessage from "../../components/ChatMessage";
import ChatForm from "../../components/ChatForm";
import axios from "axios";

export default function MemoCreate() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [structuredData, setStructuredData] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function generateAiResponse() {
    try {
      const response = await axios.post("/api/ai/generate-memo", {
        message: prompt,
      });

      const parsedData = response.data;
      setStructuredData(parsedData);
      if (parsedData.isMemo) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "사용자의 입력을 처리했습니다. 아래 메모를 생성할까요?",
            structuredData: parsedData,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "메모로 생성할 수 없는 내용입니다.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
        },
      ]);
    }
  }

  function saveToLocalStorage() {
    if (!structuredData) return;

    const existingMemos = JSON.parse(localStorage.getItem("memos") || "[]");
    const newMemo = {
      id: Date.now().toString(),
      ...structuredData,
      createdAt: new Date().toISOString(),
      isCompleted: false,
    };

    existingMemos.push(newMemo);
    localStorage.setItem("memos", JSON.stringify(existingMemos));

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "메모가 성공적으로 저장되었습니다!",
      },
    ]);

    setStructuredData(null);
  }

  function cancelSave() {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "메모 저장이 취소되었습니다.",
      },
    ]);
    setStructuredData(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!prompt.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    setPrompt("");
    setIsLoading(true);

    await generateAiResponse();
    setIsLoading(false);
  }
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                AI 메모 생성기
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-md">
                자연어로 할 일을 입력하면 <br />
                AI가 자동으로 메모를 생성합니다.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg max-w-lg">
                <h4 className="font-semibold text-gray-900 mb-3">예시</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>"내일 오후 3시에 회의 준비하기"</p>
                  <p>"다음 주까지 프로젝트 보고서 작성"</p>
                  <p>"금요일에 병원 예약하기"</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                onSave={saveToLocalStorage}
                onCancel={cancelSave}
              />
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <div className="border-t border-gray-300 bg-white p-4 flex-shrink-0">
        <ChatForm
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
