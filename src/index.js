import express from "express";
import { uploadFile } from "./upload.js";
import { askQuestion } from "./ask.js";
import dotenv from "dotenv";
import { assistantId, createAssistant, updateAssistant } from "./assistant.js";

dotenv.config();

const app = express();
app.use(express.json());

createAssistant();

// File Upload Endpoint
app.post("/upload", async (req, res) => {
  const { filePath } = req.body;

  try {
    const fileIds = await uploadFile(filePath);
    await updateAssistant(assistantId, [fileIds]);
    res.json({ message: "File uploaded and attached to assistant", fileIds });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Ask Assistant Endpoint
app.post("/ask", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await askQuestion(message, assistantId);
    console.log("Assistant Response:", response);
    res.json({ response });
  } catch (error) {
    console.error("Error in /ask endpoint:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
