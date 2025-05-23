// UploadsPage.js
import React from "react";

export default function UploadsPage() {
  const tabs = [
    { label: "Dashboard", content: <div>Dashboard Content</div> },
    { label: "Monitoring", content: <div>Monitoring Content</div> },
    { label: "Activity", content: <div>Activity Content</div> },
    { label: "Settings", content: <div>Settings Content</div> },
  ];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Uploads</h2>
    </div>
  );
}
