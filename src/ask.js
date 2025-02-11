import OpenAI from "openai";
import dotenv from "dotenv";
import { getWeather } from "./functions.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askQuestion(message, assistantId) {
  try {
    // Thread create
    const thread = await openai.beta.threads.create();
    console.log("Thread Created:", thread.id);

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });
    console.log("Message added to thread:", message);

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });
    console.log("Assistant started running with ID:", run.id);

    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    console.log("Initial Run Status:", runStatus.status);

    while (runStatus.status !== "completed") {
      console.log("Checking Run Status:", runStatus.status);

      if (runStatus.status === "failed") {
        console.error("❌ Assistant Run Failed! Full details below:");
        console.error(JSON.stringify(runStatus, null, 2)); 
        throw new Error("Assistant run failed. Check the logs for details."); 
      }
      if (runStatus.status === "requires_action") {
        console.log("Assistant requires action:", runStatus.required_action);
        const toolOutputs =
          runStatus.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall) => {
              const functionName = toolCall.function.name;
              const functionArgs = JSON.parse(toolCall.function.arguments);

              if (functionName === "getWeather") {
                const weather = getWeather(functionArgs.city);
                return { tool_call_id: toolCall.id, output: weather };
              } else {
                return {
                  tool_call_id: toolCall.id,
                  output: "Unsupported function",
                };
              }
            }
          );

        await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
          tool_outputs: toolOutputs,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const response = messages.data[0].content[0].text.value;

    return response;
  } catch (error) {
    console.error("Error in askQuestion:", error);
    throw new Error("Something went wrong");
  }
}
