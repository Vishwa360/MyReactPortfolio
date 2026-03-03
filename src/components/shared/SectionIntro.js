import React from "react";

function SectionIntro({ eyebrow, title, body, align = "left" }) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
      <h2 className="section-intro__title">{title}</h2>
      {body ? <p className="section-intro__body">{body}</p> : null}
    </div>
  );
}

export default SectionIntro;
