import OpenAI from "openai";
import fs from "fs";
import { createAssistant, updateAssistant } from "./assistant.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function uploadFile(filePath) {
  try {
    const assistantId = await createAssistant();
    // 🔹 File Upload
    const file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    console.log("File uploaded with ID:", file.id);

    await updateAssistant(assistantId, [file.id]);

    console.log("File successfully attached to Assistant.");
    return file.id;
  } catch (error) {
    console.error("Upload Error:", error);
    throw new Error("Failed to upload and attach file");
  }
}
