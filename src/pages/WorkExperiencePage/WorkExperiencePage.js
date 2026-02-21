import React from "react";
import { Grid, Column, Heading, Tag, Tile, Link } from "@carbon/react";
import { ArrowUpRight } from "@carbon/icons-react";
import "./WorkExperiencePage.scss";

const experiences = [
  {
    role: "AI Engineer",
    company: "IBM",
    logoUrl: "https://logo.clearbit.com/ibm.com",
    logoFallback: "IBM",
    duration: "Sep 2023 - Jan 2026 (2 yrs 5 mos)",
    location: "Bengaluru, Karnataka, India (Hybrid)",
    type: "Full-time",
    summary:
      "Designed and implemented Generative AI solutions on watsonx to address business problems across multiple domains.",
    highlights: [
      "Built customer care AI solutions including flood risk information delivery with digital avatar and hospital digital record query assistant.",
      "Implemented multimodal RAG solutions in telecom and finance domains.",
      "Implemented AI governance workflows in banking using OpenPages and watsonx.governance, including explainability workflows for feature impact.",
      "Implemented agentic solutions for investment recommendations, multilingual email automation, and summarizer/rewriter workflows.",
      "Built an internal code generation agent from product notebooks with error-code debugging and code explanation support.",
    ],
    techStack: [
      "watsonx.ai",
      "watsonx.governance",
      "watsonx Assistant",
      "watsonx Orchestrate",
      "Elasticsearch",
      "Milvus",
      "IBM DeepSearch",
      "Docling",
      "OpenPages",
      "Carbon AI Chat",
      "LangGraph",
      "FastAPI",
      "MCP",
      "SearXNG",
      "Soul Machines",
    ],
  },
  {
    role: "Data Scientist",
    company: "Anheuser-Busch InBev",
    logoUrl: "https://logo.clearbit.com/ab-inbev.com",
    logoFallback: "ABI",
    duration: "Jan 2022 - Sep 2023 (1 yr 9 mos)",
    location: "Bangalore Urban, Karnataka, India",
    type: "Full-time",
    summary: "Delivered forecasting, anomaly detection, and optimization solutions for finance and supply chain operations.",
    highlights: [
      "Built 8-week cashflow collection forecasting for treasury decisions using PyTorch past-covariate models (TCN, N-BEATS) scaled to Ecuador, Peru, Nigeria, and Namibia.",
      "Developed solution on Azure Databricks with Power BI reporting and deployment through Azure Synapse Analytics.",
      "Developed and deployed a Streamlit app for EDA and baseline model creation using Docker and Azure Container Registry.",
      "Built VIC early warning anomaly detection for price and quantity discrepancies, scaled to Mexico, Colombia, Peru, and Ecuador.",
      "Worked on inventory redeployment to optimize SKU movement across level-2 distribution centers and reduce obsolescence and stock-outs.",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "Azure Databricks",
      "Azure Synapse Analytics",
      "Power BI",
      "Streamlit",
      "Docker",
      "Azure Container Registry",
      "Git",
      "Azure DevOps",
    ],
  },
  {
    role: "Data Scientist",
    company: "Ericsson",
    logoUrl: "https://logo.clearbit.com/ericsson.com",
    logoFallback: "E",
    duration: "Oct 2018 - Jan 2022 (3 yrs 4 mos)",
    location: "Noida, Uttar Pradesh, India",
    type: "Full-time",
    summary:
      "Built and deployed advanced analytics and ML solutions for telecom managed services, with end-to-end data pipelines and operational dashboards.",
    highlights: [
      "Worked with business stakeholders to frame problems and deliver analytics and machine learning solutions.",
      "Built and deployed models for time-series forecasting, text classification, and anomaly detection use cases.",
      "Built Tableau dashboards with BigQuery backend to provide network performance insights.",
      "Monitored production model performance and handled lifecycle maintenance activities.",
      "Contributed to solution transition from gRPC/SQL Server/Cognos stack to GCP BigQuery, Vertex AI, Cloud Data Fusion, and Tableau.",
      "Organized internal hackathons to promote data-driven operations.",
    ],
    techStack: [
      "GCP BigQuery",
      "Vertex AI",
      "Cloud Data Fusion",
      "Tableau",
      "SQL Server",
      "Docker",
      "Git",
      "Python",
      "Cognos",
      "SPSS",
      "DBeaver",
      "pgAdmin",
    ],
  },
  {
    role: "Network Engineer - RAN Analyst",
    company: "Ericsson",
    logoUrl: "https://logo.clearbit.com/ericsson.com",
    logoFallback: "E",
    duration: "Nov 2014 - Sep 2018 (3 yrs 11 mos)",
    location: "Bengaluru, Karnataka, India",
    type: "Full-time",
    summary:
      "Performed radio network planning and optimization activities for 2G/3G/4G coverage and capacity improvement.",
    highlights: [
      "Performed coverage prediction analysis for new site planning (NTQ) and indoor/outdoor scenarios for MBNL UK.",
      "Identified coverage gaps and recommended antenna parameter changes (electrical tilt, azimuth, height).",
      "Conducted capacity analysis for newly integrated sites and monitored post-integration KPIs.",
      "Suggested probable new site locations based on coverage, capacity, and clutter analysis and prepared reports for approvals.",
    ],
    techStack: ["Asset", "Tableau", "SQL Server", "Python", "Google Earth", "QGIS"],
  },
];

export default function WorkExperiencePage() {
  return (
    <section className="work-experience-page">
      <Grid fullWidth>
        <Column sm={4} md={8} lg={12}>
          <Heading className="work-experience-page__title">Work Experience</Heading>
          <p className="work-experience-page__subtitle">
            Timeline of professional roles, responsibilities, and impact.
          </p>
        </Column>
      </Grid>

      <Grid fullWidth className="work-experience-page__timeline">
        {experiences.map((item, index) => (
          <Column sm={4} md={8} lg={12} key={`${item.role}-${index}`}>
            <Tile className="work-item">
              <div className="work-item__header">
                <div>
                  <h3 className="work-item__role">{item.role}</h3>
                  <div className="work-item__identity">
                    <span className="work-item__logo-wrap" aria-hidden="true">
                      <img
                        className="work-item__logo"
                        src={item.logoUrl}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                          const fallback = event.currentTarget.nextElementSibling;
                          if (fallback) fallback.style.display = "grid";
                        }}
                      />
                      <span className="work-item__logo-fallback">{item.logoFallback}</span>
                    </span>
                    <p className="work-item__company">{item.company}</p>
                  </div>
                </div>
                <Tag type="blue">{item.type}</Tag>
              </div>

              <div className="work-item__meta">
                <span>{item.duration}</span>
                <span>{item.location}</span>
              </div>

              <p className="work-item__summary">{item.summary}</p>

              <ul className="work-item__highlights">
                {item.highlights.map((point, pointIndex) => (
                  <li key={`${item.role}-highlight-${pointIndex}`}>{point}</li>
                ))}
              </ul>

              <div className="work-item__tech-stack">
                {item.techStack.map((tech) => (
                  <Tag key={`${item.role}-${tech}`} type="gray">
                    {tech}
                  </Tag>
                ))}
              </div>
            </Tile>
          </Column>
        ))}

        <Column sm={4} md={8} lg={12}>
          <div className="work-experience-page__source">
            <Link
              href="https://www.linkedin.com/in/vishwajith-cr/"
              target="_blank"
              rel="noopener noreferrer"
              renderIcon={ArrowUpRight}
            >
              LinkedIn Profile
            </Link>
          </div>
        </Column>
      </Grid>
    </section>
  );
}
