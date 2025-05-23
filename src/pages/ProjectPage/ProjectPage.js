import React from "react";
import "./ProjectPage.scss";
import { ClickableTile } from "@carbon/react";

function ProfilePage() {
  return (
    <div className="profile-page">
      <h1 className="page-header">My Projects</h1>

      {/* Clickable Tiles with AI Label */}
      <div className="ai-label-tile-container">
        {/* Project 1 with AI Label */}
        <ClickableTile
          className="cds--tile cds--tile--decorator"
          id="tile-1"
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="tile-content">
            <h4>Project 1</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at consectetur turpis mauris gravida
              penatibus.
            </p>
            <div className="ai-data">
              <div className="data-container">
                <p>Data Quality</p>
                <h3>85%</h3>
              </div>
              <div className="data-container">
                <p>Label text</p>
                <h3>16%</h3>
              </div>
            </div>
            <div className="cds--tile--inner-decorator">
              <div className="ai-label-container cds--ai-label" id="AILabel-1">
                <button
                  aria-expanded="false"
                  aria-label="AI Show information"
                  type="button"
                  className="cds--toggletip-button cds--ai-label__button cds--ai-label__button--xs cds--ai-label__button--default"
                >
                  <span className="cds--ai-label__text">AI</span>
                </button>
              </div>
            </div>
          </div>
        </ClickableTile>

        {/* Project 2 with AI Label */}
        <ClickableTile
          className="cds--tile cds--tile--decorator"
          id="tile-2"
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="tile-content">
            <h4>Project 2</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at consectetur turpis mauris gravida
              penatibus.
            </p>
            <div className="ai-data">
              <div className="data-container">
                <p>Data Quality</p>
                <h3>90%</h3>
              </div>
              <div className="data-container">
                <p>Label text</p>
                <h3>20%</h3>
              </div>
            </div>
            <div className="cds--tile--inner-decorator">
              <div className="ai-label-container cds--ai-label" id="AILabel-2">
                <button
                  aria-expanded="false"
                  aria-label="AI Show information"
                  type="button"
                  className="cds--toggletip-button cds--ai-label__button cds--ai-label__button--xs cds--ai-label__button--default"
                >
                  <span className="cds--ai-label__text">AI</span>
                </button>
              </div>
            </div>
          </div>
        </ClickableTile>

        {/* Project 3 with AI Label */}
        <ClickableTile
          className="cds--tile cds--tile--decorator"
          id="tile-3"
          href="https://www.anotherexample.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="tile-content">
            <h4>Project 3</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at consectetur turpis mauris gravida
              penatibus.
            </p>
            <div className="ai-data">
              <div className="data-container">
                <p>Data Quality</p>
                <h3>75%</h3>
              </div>
              <div className="data-container">
                <p>Label text</p>
                <h3>10%</h3>
              </div>
            </div>
            <div className="cds--tile--inner-decorator">
              <div className="ai-label-container cds--ai-label" id="AILabel-3">
                <button
                  aria-expanded="false"
                  aria-label="AI Show information"
                  type="button"
                  className="cds--toggletip-button cds--ai-label__button cds--ai-label__button--xs cds--ai-label__button--default"
                >
                  <span className="cds--ai-label__text">AI</span>
                </button>
              </div>
            </div>
          </div>
        </ClickableTile>
      </div>
    </div>
  );
}

export default ProfilePage;
