import React from "react";
import { Grid, Column, Tag, Tile, Link } from "@carbon/react";
import { ArrowUpRight } from "@carbon/icons-react";
import "./WorkExperiencePage.scss";
import SectionIntro from "../../components/shared/SectionIntro";
import { profile, workExperience } from "../../content/profile";

export default function WorkExperiencePage() {
  return (
    <section className="work-experience-page">
      <Grid fullWidth>
        <Column sm={4} md={8} lg={5}>
          <div className="work-experience-page__intro">
            <SectionIntro
              eyebrow="Career Journey"
              title="Experience built around business outcomes, not just models."
              body="From telecom networks to enterprise AI platforms, the through-line is the same: practical systems, measurable impact, and production discipline."
            />
            <Tile className="work-experience-page__summary-card">
              <div className="work-experience-page__summary-grid">
                {profile.stats.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <p className="work-experience-page__summary-value">{stat.value}</p>
                    <p className="work-experience-page__summary-label">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="work-experience-page__summary-links">
                <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" renderIcon={ArrowUpRight}>
                  LinkedIn Profile
                </Link>
                <Link href={profile.github} target="_blank" rel="noopener noreferrer" renderIcon={ArrowUpRight}>
                  GitHub Projects
                </Link>
              </div>
            </Tile>
          </div>
        </Column>
        <Column sm={4} md={8} lg={11} className="work-experience-page__timeline">
          {workExperience.map((item, index) => (
            <Tile className="work-item" key={`${item.role}-${index}`}>
              <div className="work-item__eyebrow">
                <span>{item.period}</span>
                <span>{item.duration}</span>
              </div>

              <div className="work-item__header">
                <div>
                  <h3 className="work-item__role">{item.role}</h3>
                  <div className="work-item__identity">
                    <span className="work-item__logo-wrap" aria-hidden="true">
                      <span className="work-item__logo-fallback">{item.logoFallback}</span>
                    </span>
                    <div>
                      <p className="work-item__company">{item.company}</p>
                      <p className="work-item__location">{item.location}</p>
                    </div>
                  </div>
                </div>
                <Tag type="blue">{item.type}</Tag>
              </div>

              <p className="work-item__summary">{item.summary}</p>

              <ul className="work-item__highlights">
                {item.highlights.map((point, pointIndex) => (
                  <li key={`${item.role}-highlight-${pointIndex}`}>{point}</li>
                ))}
              </ul>

              <div className="work-item__tech-stack">
                {item.techStack.map((tech) => (
                  <Tag key={`${item.role}-${tech}`} type="cool-gray">
                    {tech}
                  </Tag>
                ))}
              </div>
            </Tile>
          ))}
        </Column>
      </Grid>
    </section>
  );
}
