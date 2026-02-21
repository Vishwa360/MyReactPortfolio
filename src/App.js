import React, { useEffect } from "react";
import { Content, Header, HeaderName, GlobalTheme } from "@carbon/react";
import { ChatContainer, MessageResponseTypes } from "@carbon/ai-chat";
import "./App.scss";
import Homepage from "./pages/HomePage/Homepage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import UploadsPage from "./pages/UploadsPage/UploadsPage";
import WorkExperiencePage from "./pages/WorkExperiencePage/WorkExperiencePage";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const WELCOME_TEXT =
  "Hello. This is the Carbon AI Chat basic integration. Connect customSendMessage to your backend for real responses.";

const chatConfig = {
  launcher: {
    isOn: true,
  },
  messaging: {
    customSendMessage: async (request, _requestOptions, instance) => {
      const inputText = request?.input?.text?.trim();
      const responseText = inputText
        ? `You said: "${inputText}". Replace this mock with your real assistant API response.`
        : WELCOME_TEXT;

      await instance.messaging.addMessage({
        output: {
          generic: [
            {
              response_type: MessageResponseTypes.TEXT,
              text: responseText,
            },
          ],
        },
      });
    },
  },
};

function App() {
  const theme = "g100"; // ← your implementation, e.g. fetching user settings

  useEffect(() => {
    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <BrowserRouter>
        <Content>
          <Header aria-label="Header for Our Skeleton App">
            <HeaderName href="https://react.carbondesignsystem.com/" prefix="Carbon Design System">
              Header for Our Skeleton App
            </HeaderName>
          </Header>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Navigate to="/homepage" />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/upload" element={<UploadsPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/work-experience" element={<WorkExperiencePage />} />
          </Routes>
        </Content>
        <ChatContainer {...chatConfig} />
      </BrowserRouter>
    </GlobalTheme>
  );
}

export default App;
