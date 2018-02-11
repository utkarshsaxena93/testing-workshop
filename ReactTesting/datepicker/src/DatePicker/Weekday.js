import React from "react";

export default function Weekday({ label, title, current }) {
  return (
    <div aria-label={label} className="Weekday">
      {title}
    </div>
  );
}
