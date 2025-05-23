// Tabs.js
import React, { useState } from "react";
import "./Tabs.css";

export function Tabs({ tabs }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="my-tabs">
      <div className="tab-list">
        {tabs.map(({ label }, idx) => (
          <button
            key={label}
            className={`tab-button${idx === selected ? " active" : ""}`}
            onClick={() => setSelected(idx)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-panel">{tabs[selected].content}</div>
    </div>
  );
}
