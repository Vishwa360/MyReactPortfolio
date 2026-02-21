// src/pages/HomePage/Homepage.js

import React from "react";
import {
  Header,
  HeaderName,
  Content,
  Heading,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tile,
} from "@carbon/react";
import "./index.scss";
import Navigation from "../../components/navigation/Navigation";

const skills = [
  {
    area: "Machine Learning",
    details: "Supervised, Unsupervised, and Reinforcement Learning",
  },
  {
    area: "Deep Learning",
    details: "CNNs, RNNs, Transformers",
  },
  {
    area: "Model Deployment",
    details: "Docker, FastAPI, Flask, Streamlit, Shiny",
  },
  {
    area: "Production ML",
    details: "MLOps, Model Monitoring, Retraining Pipelines",
  },
  {
    area: "Data Engineering",
    details: "ETL, Apache Airflow, Spark, Pandas",
  },
  {
    area: "Natural Language Processing",
    details: "spaCy, Hugging Face Transformers",
  },
  {
    area: "Computer Vision",
    details: "OpenCV, PyTorch, TensorFlow",
  },
  {
    area: "Prompt Engineering & LLM Integration",
    details: "OpenAI, LangChain, RAG",
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
        <section className="homepage">
          <Heading className="homepage__title">Welcome to My Portfolio</Heading>
          <div className="homepage__photo-wrap">
            <img src="/assets/profile_3.jpg" alt="Vishwajith" className="homepage__photo" />
          </div>
          <p className="homepage__intro">
            I am Vishwajith, an AI Engineer with a passion for building intelligent systems that solve real-world
            problems. My expertise lies in developing data science projects, deploying machine learning models, and
            monitoring their performance in production environments.
          </p>

          <Tabs className="homepage__tabs">
            <TabList aria-label="Homepage sections">
              <Tab>Key Skills</Tab>
              <Tab>Profile</Tab>
              <Tab>Contact</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Tile className="homepage__panel">
                  <div className="homepage__skills">
                    {skills.map((skill) => (
                      <article key={skill.area} className="homepage__skill-item">
                        <h3 className="homepage__skill-area">{skill.area}</h3>
                        <p className="homepage__skill-details">{skill.details}</p>
                      </article>
                    ))}
                  </div>
                </Tile>
              </TabPanel>

              <TabPanel>
                <Tile className="homepage__panel">
                  <p className="homepage__profile-text">
                    AI Engineer with hands-on experience delivering Generative AI, RAG, governance, and ML solutions
                    across telecom, finance, and enterprise domains.
                  </p>
                  <div className="homepage__profile-tags">
                    <Tag type="purple">Generative AI</Tag>
                    <Tag type="teal">RAG</Tag>
                    <Tag type="cyan">MLOps</Tag>
                    <Tag type="green">Data Science</Tag>
                  </div>
                </Tile>
              </TabPanel>

              <TabPanel>
                <Tile className="homepage__panel">
                  <p className="homepage__contact-line">
                    Email:{" "}
                    <Link href="mailto:vishwa.jith360@gmail.com" inline>
                      vishwa.jith360@gmail.com
                    </Link>
                  </p>
                  <p className="homepage__contact-line">
                    LinkedIn:{" "}
                    <Link
                      href="https://www.linkedin.com/in/vishwajith-cr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      inline
                    >
                      linkedin.com/in/vishwajith-cr
                    </Link>
                  </p>
                  <p className="homepage__contact-line">
                    GitHub:{" "}
                    <Link href="https://github.com/Vishwa360" target="_blank" rel="noopener noreferrer" inline>
                      github.com/Vishwa360
                    </Link>
                  </p>
                </Tile>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>
      </Content>
    </>
  );
}
