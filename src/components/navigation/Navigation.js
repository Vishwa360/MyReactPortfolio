import React from "react";
import { Header, HeaderName, HeaderNavigation, HeaderMenuItem, Theme } from "@carbon/react";

function Navigation() {
  return (
    <Theme theme="g100">
      {" "}
      {/* Apply the g100 theme inline */}
      <Header aria-label="Header Navigation" className="custom-header">
        <img
          src="https://photos.app.goo.gl/YKRdSqdxXmdF1GRV9" // Replace with your photo URL or local path
          alt="Vishwajith"
          style={{
            borderRadius: "10%",
            width: "10px",
            height: "10px",
            marginRight: "2px",
            verticalAlign: "middle",
          }}
        />
        <HeaderName href="/" prefix="">
          <strong>VISHWAJITH</strong>
        </HeaderName>
        <HeaderNavigation aria-label="Navigation Links">
          <HeaderMenuItem href="/homepage">
            <strong>Home</strong>
          </HeaderMenuItem>
          <HeaderMenuItem href="/project">
            <strong>Projects</strong>
          </HeaderMenuItem>
          <HeaderMenuItem href="/work-experience">
            <strong>Work Experience</strong>
          </HeaderMenuItem>
          <HeaderMenuItem href="/upload">
            <strong>Upload</strong>
          </HeaderMenuItem>
        </HeaderNavigation>
      </Header>
    </Theme>
  );
}

export default Navigation;
