import React from "react";

export default function Day({
  fullDate,
  onClick,
  selected,
  onMouseEnter,
  onMouseLeave,
  hovering,
}) {
  if (fullDate == null) {
    return <div className="EmptyStateDay" />;
  }

  const date = fullDate.getDate();
  
  let className = "Day";

  if (selected) {
    className = "Day Day--selected";
  } else if (hovering) {
    className = "Day Day--hovering";
  }

  return (
    <button
      className={className}
      onClick={onClick.bind(this, date)}
      onMouseEnter={onMouseEnter.bind(this, date)}
      onMouseLeave={onMouseLeave.bind(this, date)}
    >
      {date}
    </button>
  );
}
