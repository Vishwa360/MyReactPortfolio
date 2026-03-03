import React from "react";
import { Header, HeaderGlobalAction, HeaderGlobalBar, HeaderName, HeaderNavigation, Theme } from "@carbon/react";
import { LogoGithub, LogoLinkedin } from "@carbon/icons-react";
import { NavLink } from "react-router-dom";
import { profile } from "../../content/profile";
import "./Navigation.scss";

const navItems = [
  { label: "Home", to: "/homepage" },
  { label: "Work Experience", to: "/work-experience" },
];

function Navigation() {
  return (
    <Theme theme="g100">
      <Header aria-label="Header Navigation" className="custom-header">
        <div className="custom-header__brand-mark" aria-hidden="true">
          <img src="/assets/profile_3.jpg" alt="" />
        </div>
        <HeaderName as={NavLink} to="/homepage" prefix="" className="custom-header__name">
          {profile.shortName}
        </HeaderName>
        <HeaderNavigation aria-label="Navigation Links" className="custom-header__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "custom-header__nav-link custom-header__nav-link--active" : "custom-header__nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </HeaderNavigation>
        <HeaderGlobalBar className="custom-header__actions">
          <HeaderGlobalAction
            aria-label="Open LinkedIn profile"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            tooltipAlignment="end"
          >
            <LogoLinkedin size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Open GitHub profile"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            tooltipAlignment="end"
          >
            <LogoGithub size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </Theme>
  );
}

export default Navigation;
