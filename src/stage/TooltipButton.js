import React, { useState } from "react";

const TooltipButton = ({ text, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const styles = {
    buttonContainer: {
      position: "relative",
      display: "inline-block",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#1a1f2e",
      color: "#a0aec0",
      border: "1px solid #2d3748",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.2s ease",
    },
    tooltip: {
      position: "absolute",
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginBottom: "8px",
      padding: "6px 12px",
      backgroundColor: "#2d3748",
      color: "#a0aec0",
      fontSize: "12px",
      borderRadius: "4px",
      whiteSpace: "nowrap",
      opacity: showTooltip ? 1 : 0,
      visibility: showTooltip ? "visible" : "hidden",
      transition: "opacity 0.2s ease, visibility 0.2s ease",
    },
    // Add a small arrow at the bottom of tooltip
    tooltipArrow: {
      position: "absolute",
      bottom: "-4px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "0",
      height: "0",
      borderLeft: "4px solid transparent",
      borderRight: "4px solid transparent",
      borderTop: "4px solid #2d3748",
    },
  };

  return (
    <div
      style={styles.buttonContainer}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button style={styles.button}>{text}</button>
      <div style={styles.tooltip}>
        {tooltip}
        <div style={styles.tooltipArrow}></div>
      </div>
    </div>
  );
};

export default TooltipButton