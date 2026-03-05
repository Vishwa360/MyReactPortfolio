// src/pages/HomePage/Homepage.js

import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Column, Grid, Heading, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, Tile } from "@carbon/react";
import { ArrowRight, ArrowUpRight, LogoGithub, LogoLinkedin } from "@carbon/icons-react";
import "./index.scss";
import SectionIntro from "../../components/shared/SectionIntro";
import { profile } from "../../content/profile";

export default function Homepage() {
  return (
    <div className="homepage">
      <Grid fullWidth className="homepage__hero-grid">
        <Column sm={4} md={8} lg={8} className="homepage__hero-copy">
          <SectionIntro eyebrow={profile.title} title={profile.heroTitle} body={profile.summary} />

          <div className="homepage__hero-actions">
            <Button as={NavLink} to="/work-experience" renderIcon={ArrowRight}>
              Explore Experience
            </Button>
            <Button
              kind="tertiary"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              renderIcon={LogoLinkedin}
            >
              LinkedIn
            </Button>
            <Button
              kind="tertiary"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              renderIcon={LogoGithub}
            >
              GitHub
            </Button>
            <Button
              kind="tertiary"
              href={profile.medium}
              target="_blank"
              rel="noopener noreferrer"
              renderIcon={ArrowUpRight}
            >
              Medium
            </Button>
          </div>

          <div className="homepage__meta">
            <span>{profile.location}</span>
            <span>{profile.email}</span>
            <span>Available for enterprise AI and platform-focused roles</span>
          </div>
        </Column>

        <Column sm={4} md={8} lg={8} className="homepage__hero-side">
          <Tile className="homepage__identity-card">
            <div className="homepage__identity-top">
              <div>
                <p className="homepage__identity-label">Profile</p>
                <Heading className="homepage__identity-name">{profile.shortName}</Heading>
                <p className="homepage__identity-role">{profile.title}</p>
              </div>
              <Tag type="blue">Open to AI leadership-track impact</Tag>
            </div>
            <img src="/assets/profile_3.jpg" alt="Vishwajith" className="homepage__photo" />
            <p className="homepage__identity-summary">{profile.shortBio}</p>
            <div className="homepage__identity-tags">
              {profile.capabilities.slice(0, 6).map((item) => (
                <Tag key={item} type="gray">
                  {item}
                </Tag>
              ))}
            </div>
          </Tile>
        </Column>
      </Grid>

      <Grid fullWidth className="homepage__stats-grid">
        {profile.stats.map((stat) => (
          <Column sm={2} md={4} lg={4} key={stat.label}>
            <Tile className="homepage__stat-card">
              <p className="homepage__stat-value">{stat.value}</p>
              <p className="homepage__stat-label">{stat.label}</p>
            </Tile>
          </Column>
        ))}
      </Grid>

      <Grid fullWidth className="homepage__section">
        <Column sm={4} md={8} lg={5}>
          <SectionIntro
            eyebrow="Focus Areas"
            title="AI / ML Engineering"
            body="Developing, Deploying, Monitoring and Maintaining High Business Impact practical GenAI / ML systems, measurable delivery, and enterprise-grade implementation discipline."
          />
        </Column>
        <Column sm={4} md={8} lg={11}>
          <div className="homepage__focus-grid">
            {profile.focusAreas.map((area) => (
              <Tile key={area.title} className="homepage__focus-card">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </Tile>
            ))}
          </div>
        </Column>
      </Grid>

      <Grid fullWidth className="homepage__section">
        <Column sm={4} md={8} lg={16}>
          <Tabs className="homepage__tabs">
            <TabList aria-label="Portfolio details">
              <Tab>Capabilities</Tab>
              <Tab>Education</Tab>
              <Tab>Contact</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Tile className="homepage__panel">
                  <div className="homepage__skills">
                    {profile.capabilities.map((skill, index) => (
                      <Tag key={skill} type={index % 2 === 0 ? "cyan" : "teal"}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </Tile>
              </TabPanel>

              <TabPanel>
                <Tile className="homepage__panel">
                  <div className="homepage__education-list">
                    {profile.education.map((item) => (
                      <article key={`${item.school}-${item.year}`} className="homepage__education-item">
                        <div>
                          <h3>{item.school}</h3>
                          <p>{item.degree}</p>
                        </div>
                        <div className="homepage__education-meta">
                          <span>{item.year}</span>
                          <Tag type="blue">{item.format}</Tag>
                        </div>
                      </article>
                    ))}
                  </div>
                </Tile>
              </TabPanel>

              <TabPanel>
                <Tile className="homepage__panel">
                  <div className="homepage__contact-list">
                    <p>
                      <strong>Email:</strong>{" "}
                      <Link href={`mailto:${profile.email}`} inline>
                        {profile.email}
                      </Link>
                    </p>
                    <p>
                      <strong>LinkedIn:</strong>{" "}
                      <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" inline>
                        linkedin.com/in/vishwajith-cr
                      </Link>
                    </p>
                    <p>
                      <strong>GitHub:</strong>{" "}
                      <Link href={profile.github} target="_blank" rel="noopener noreferrer" inline>
                        github.com/Vishwa360
                      </Link>
                    </p>
                    <p>
                      <strong>Languages:</strong> {profile.languages.join(", ")}
                    </p>
                  </div>
                </Tile>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Column>
      </Grid>
    </div>
  );
}
