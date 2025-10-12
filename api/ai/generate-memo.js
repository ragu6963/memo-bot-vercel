import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const chat = ai.chats.create({
  model: "gemini-2.5-flash",
});

const responseSchema = {
  type: "object",
  properties: {
    isMemo: {
      type: "boolean",
      description: "할 일 여부",
    },
    content: {
      type: "string",
      description: "할 일 내용",
    },
    dueDate: {
      type: "string",
      description: "마감 날짜(YYYY-MM-DD)",
    },
    priority: {
      type: "string",
      enum: ["높음", "중간", "낮음"],
      description: "우선 순위",
    },
    category: {
      type: "string",
      description: "할 일 종류",
    },
  },
  required: ["isMemo", "content", "dueDate"],
  additionalProperties: false,
};

const systemInstruction = [
  `오늘 날짜: ${new Date().toISOString().split("T")[0]}`,
  "당신은 할 일 관리 AI입니다. 오직 할 일이나 업무 관련 내용만 처리합니다.",
  "JSON 형식으로 응답합니다.",
  "할 일이 아닌 일반적인 대화, 인사, 질문은 무시하고, isMemo를 false로 설정합니다.",
  "사용자의 질문을 이해할 수 없는 경우에는 isMemo를 false로 설정합니다.",
  "응답할 때는 할 일 내용, 마감 날짜, 우선 순위, 할 일 종류를 포함한 객체를 생성합니다.",
];

const config = {
  responseMimeType: "application/json",
  responseJsonSchema: responseSchema,
  systemInstruction: systemInstruction,
};

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await chat.sendMessage({
      message: message,
      config: config,
    });

    const parsedData = JSON.parse(response.text);

    return res.status(200).json(parsedData);
  } catch (error) {
    console.error("AI generation error:", error);
    return { error: "Internal server error" };
  }
}
