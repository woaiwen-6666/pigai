import { GoogleGenAI, Type } from "@google/genai";
import { GradingResult, Subject, EducationLevel } from "../types";

// Helper to remove the data URL prefix for Gemini
const stripBase64Header = (base64String: string): string => {
  return base64String.replace(/^data:image\/\w+;base64,/, "");
};

const apiKey = process.env.API_KEY || ""; 
const ai = new GoogleGenAI({ apiKey });

export const gradeHomework = async (
  imageBase64: string,
  subject: Subject,
  level: EducationLevel
): Promise<GradingResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const model = "gemini-2.5-flash"; // Using flash for speed and multimodal capability

  const systemInstruction = `You are an expert, encouraging, and strict teacher specializing in ${subject} for ${level} students. 
  Your task is to grade the homework shown in the image. 
  1. Identify each question and the student's answer.
  2. Determine if the answer is correct.
  3. If incorrect, provide the correct answer and a brief, easy-to-understand explanation.
  4. Assign a score from 0 to 100 based on accuracy.
  5. Provide a short, encouraging overall comment in Chinese.
  
  Important: The output must be strictly in Chinese (Simplified).`;

  const prompt = "Please grade this homework page.";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg", // Assuming JPEG/PNG, typical from canvas/camera
              data: stripBase64Header(imageBase64),
            },
          },
          { text: prompt },
        ],
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "The total score out of 100" },
            overall_comment: { type: Type.STRING, description: "A brief encouraging summary in Chinese" },
            corrections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question_id: { type: Type.STRING, description: "Question number or identifier (e.g., 'Q1')" },
                  is_correct: { type: Type.BOOLEAN, description: "True if the student is correct" },
                  user_answer: { type: Type.STRING, description: "What the student wrote (transcribed)" },
                  correct_answer: { type: Type.STRING, description: "The correct solution" },
                  explanation: { type: Type.STRING, description: "Why the answer is wrong, or a brief reinforcement if correct" },
                },
                required: ["question_id", "is_correct", "explanation"],
              },
            },
          },
          required: ["score", "overall_comment", "corrections"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    const result = JSON.parse(text) as GradingResult;
    return result;

  } catch (error) {
    console.error("Gemini Grading Error:", error);
    throw new Error("Failed to grade homework. Please try again with a clearer image.");
  }
};