import React from "react";
import "./ProjectPage.scss";

const projects = [
  {
    title: "Piggment",
    description: "The Gradients and colors for the next smart creator",
    techStack: ["React", "Sass", "CSS", "JavaScript", "Context"],
    imageUrl: "https://i.ibb.co/txPxtCP/Frame-21-1.png",
    projectLink: "https://www.codewonders.dev/projects/piggment",
  },
  {
    title: "Scoutbar",
    description:
      "Navigation tool that significantly increases efficiency by reducing the number of clicks it takes you to navigate the web.",
    techStack: ["TypeScript", "Rollup", "React", "Next.js"],
    imageUrl: "https://i.ibb.co/T0XwFsQ/Screen-Recording-2020-05-06-at-3.gif",
    projectLink: "https://www.codewonders.dev/projects/scoutbar",
  },
  // Add more projects as needed
];

const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <h1 className="page-title">Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a key={index} href={project.projectLink} className="project-card" target="_blank" rel="noopener noreferrer">
            <img src={project.imageUrl} alt={project.title} className="project-image" />
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <ul className="tech-stack">
                {project.techStack.map((tech, idx) => (
                  <li key={idx} className="tech-item">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
