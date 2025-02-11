import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let assistantId = null;

export async function createAssistant() {
  if (assistantId) return assistantId;

  const assistant = await openai.beta.assistants.create({
    name: "File Search + Code Interpreter + Function Calling Assistant",
    instructions:
      "You are a helpful AI assistant. Use File Search, Code Interpreter, and Function Calling to help the user.",
    tools: [
      { type: "file_search" },
      { type: "code_interpreter" },
      {
        type: "function",
        function: {
          name: "getWeather",
          description: "Get the weather for a specific city.",
          parameters: {
            type: "object",
            properties: {
              city: { type: "string", description: "The city name" },
            },
            required: ["city"],
          },
        },
      },
    ],
    model: "gpt-3.5-turbo-1106",
  });

  assistantId = assistant.id;
  console.log("Assistant created with ID:", assistantId);
  return assistantId;
}

// update the assistant
export async function updateAssistant(fileIds) {
  const fileIdsArray = Array.isArray(fileIds) ? fileIds : [fileIds];

  await openai.beta.assistants.update(assistantId, {
    file_ids: fileIdsArray, 
  });

  console.log("Assistant updated with file IDs:", fileIdsArray);
}

export { assistantId };


