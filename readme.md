# 🚀 AI Assistant API - OpenAI Assistant with File Search & Function Calling

An intelligent AI assistant using OpenAI's Assistant API, supporting **file search, function calling, and dynamic responses**.

## 🌟 Features

- 🤖 **AI-powered assistant** with OpenAI API
- 📂 **File upload & retrieval** for better context understanding
- ⚡ **Function calling support** (e.g., real-time weather updates)
- 📝 **Thread-based conversation handling**

## 🛠️ Tech Stack

- **Node.js + Express.js**
- **OpenAI Assistant API**
- **File handling with fs module**
- **Dotenv for environment variables**

## 🔥 Future Enhancements

- 🔗 **Real-time function calling** (e.g., APIs for live data)
- 💾 **Database integration** for chat history
- 🎤 **Voice input support** for seamless interaction

## 📂 Project Structure

/file-search-code-interpreter-function-calling
│── /src
│ │── assistant.js # Assistant create/update logic
│ │── upload.js # File upload logic
│ │── ask.js # User queries handle 
│ │── functions.js # Custom functions for Function Calling
│ │── index.js # Main server file
│── .env # API keys
│── package.json # Dependencies
│── README.md # Documentation


## 🚀 Installation & Usage  

### 1️⃣ Clone the Repository  
```sh
git clone <https://github.com/abhishekKumar253/openai-assistant-api>
cd <openai-assistant-api>

2️⃣ Install Dependencies
npm install

3️⃣ Start the Server
npm run dev

3️⃣ Set Up Environment Variables (.env)

OPENAI_API_KEY=your_openai_api_key  
PORT=5000  

