import React, { useEffect } from "react";
import { Content, GlobalTheme } from "@carbon/react";
import { ChatContainer, MessageResponseTypes } from "@carbon/ai-chat";
import "./App.scss";
import Homepage from "./pages/HomePage/Homepage";
import WorkExperiencePage from "./pages/WorkExperiencePage/WorkExperiencePage";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const WELCOME_TEXT = "Hello. Ask anything about me :)";

const LOCAL_RAG_CHAT_URL = process.env.REACT_APP_RAG_CHAT_URL || "http://localhost:8080/api/v1/chat/stream";

let localChatHistory = [];

const createCarbonStreamingChunk = ({ responseId, itemId, text }) => ({
  streaming_metadata: {
    response_id: responseId,
  },
  partial_item: {
    response_type: MessageResponseTypes.TEXT,
    text,
    streaming_metadata: {
      id: itemId,
      cancellable: true,
    },
  },
});

const createCarbonFinalChunk = ({ responseId, answer }) => ({
  final_response: {
    id: responseId,
    output: {
      generic: [
        {
          response_type: MessageResponseTypes.TEXT,
          text: answer,
        },
      ],
    },
  },
});

const parseStreamLines = async ({ response, onLine }) => {
  if (!response.body) {
    throw new Error("Streaming response body is unavailable.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffered = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    buffered += decoder.decode(value, { stream: true });
    const lines = buffered.split("\n");
    buffered = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }
      await onLine(JSON.parse(line));
    }
  }

  if (buffered.trim()) {
    await onLine(JSON.parse(buffered));
  }
};

const streamQuestionToLocalRag = async ({ question, signal, instance }) => {
  const response = await fetch(LOCAL_RAG_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify({
      question,
      chat_history: localChatHistory,
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const errorMessage = payload?.detail || payload?.message || "Local RAG service request failed.";
    throw new Error(errorMessage);
  }

  let finalAnswer = "";

  await parseStreamLines({
    response,
    onLine: async (payload) => {
      if (payload?.type === "chunk") {
        await instance.messaging.addMessageChunk(
          createCarbonStreamingChunk({
            responseId: payload.response_id,
            itemId: payload.item_id,
            text: payload.text,
          }),
        );
        return;
      }

      if (payload?.type === "final") {
        finalAnswer = payload.answer || "";
        await instance.messaging.addMessageChunk(
          createCarbonFinalChunk({
            responseId: payload.response_id,
            answer: finalAnswer,
          }),
        );
        return;
      }

      if (payload?.type === "error") {
        throw new Error(payload.message || "Local RAG streaming failed.");
      }
    },
  });

  return finalAnswer;
};

const chatConfig = {
  launcher: {
    isOn: true,
  },
  messaging: {
    customSendMessage: async (request, requestOptions, instance) => {
      const inputText = request?.input?.text?.trim();
      if (!inputText) {
        await instance.messaging.addMessage({
          output: {
            generic: [
              {
                response_type: MessageResponseTypes.TEXT,
                text: WELCOME_TEXT,
              },
            ],
          },
        });
        return;
      }

      try {
        const answerText = await streamQuestionToLocalRag({
          question: inputText,
          signal: requestOptions?.signal,
          instance,
        });

        localChatHistory = [
          ...localChatHistory,
          { role: "human", content: inputText },
          { role: "assistant", content: answerText || "No answer returned." },
        ];
      } catch (error) {
        await instance.messaging.addMessage({
          output: {
            generic: [
              {
                response_type: MessageResponseTypes.TEXT,
                text: `Local RAG service error: ${error.message}`,
              },
            ],
          },
        });
      }
    },
  },
};

function App() {
  const theme = "g10";

  useEffect(() => {
    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <BrowserRouter>
        <div className="app-shell">
          <Navigation />
          <Content className="app-content">
            <Routes>
              <Route path="/" element={<Navigate to="/homepage" replace />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/work-experience" element={<WorkExperiencePage />} />
              <Route path="/upload" element={<Navigate to="/homepage" replace />} />
              <Route path="/project" element={<Navigate to="/homepage" replace />} />
              <Route path="*" element={<Navigate to="/homepage" replace />} />
            </Routes>
          </Content>
        </div>
        <ChatContainer {...chatConfig} />
      </BrowserRouter>
    </GlobalTheme>
  );
}

export default App;
