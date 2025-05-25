// src/pages/HomePage/Homepage.js

import React from "react";
import { Header, HeaderName, Content, Heading } from "@carbon/react";
import "./index.scss";
import Navigation from "../../components/navigation/Navigation";
import { Tabs } from "./Tabs";

const tabs = [
  {
    label: "Key Skills",
    content: (
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
        <li style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Machine Learning</strong> (Supervised, Unsupervised, and Reinforcement Learning)
        </li>
        <li style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Deep Learning</strong> (CNNs, RNNs, Transformers)
        </li>
        <li style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Model Deployment</strong> (Docker, FastAPI, Flask, Streamlit, Shiny)
        </li>
        <li style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Production ML</strong> (MLOps, Model Monitoring, Retraining Pipelines)
        </li>
        <li style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Data Engineering</strong> (ETL, Apache Airflow, Spark, Pandas)
        </li>
        <li style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Natural Language Processing</strong> (spaCy, Hugging Face Transformers)
        </li>
        <li style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Computer Vision</strong> (OpenCV, PyTorch, TensorFlow)
        </li>
        <li style={{ fontSize: "16px", marginBottom: "15px" }}>
          <strong>Prompt Engineering & LLM Integration</strong> (OpenAI, LangChain, RAG)
        </li>
      </ul>
    ),
  },
  {
    label: "Profile",
    content: <div>Profile information coming soon.</div>,
  },
  {
    label: "Contact",
    content: (
      <div>
        <p>Email: vishwajith@example.com</p>
        <p>
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/vishwajith-cr/" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/vishwajith
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a href="https://github.com/Vishwa360" target="_blank" rel="noopener noreferrer">
            github.com/vishwajith
          </a>
        </p>
      </div>
    ),
  },
];

export default function Homepage() {
  return (
    <>
      <Header aria-label="Header for Our Skeleton App">
        <HeaderName href="https://react.carbondesignsystem.com/" prefix="Carbon Design System">
          Welcome to Vishwajith's Portfolio
        </HeaderName>
      </Header>

      <Navigation />

      <Content>
        <Heading style={{ textAlign: "center", fontSize: "3.5rem", fontWeight: "bold", marginBottom: "20px" }}>
          Welcome to My Portfolio
        </Heading>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/assets/profile_3.jpg" // Place the image in the public/assets folder
            alt="Vishwajith"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
        </div>
        <p style={{ marginBottom: "20px", marginTop: "20px" }}>
          I am Vishwajith, an AI Engineer with a passion for building intelligent systems that solve real-world
          problems. My expertise lies in developing data science projects, deploying machine learning models, and
          monitoring their performance in production environments.
        </p>
      </Content>

      <Tabs tabs={tabs} />
    </>
  );
}
