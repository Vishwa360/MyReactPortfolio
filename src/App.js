import React, { useEffect } from "react";
import { Content, Header, HeaderName, GlobalTheme } from "@carbon/react";
import "./App.scss";
import Homepage from "./pages/HomePage/Homepage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import UploadsPage from "./pages/UploadsPage/UploadsPage";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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
          </Routes>
        </Content>
      </BrowserRouter>
    </GlobalTheme>
  );
}

export default App;
