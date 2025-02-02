import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import downloadAsJPG from "./functions/downloadAsJPG";
import downloadAsPDF from "./functions/downloadAsPDF";

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [selectedOption, setSelectedOption] = useState(value || options[0]);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const styles = {
    container: {
      position: "relative",
      width: "150px",
    },
    button: {
      width: "100%",
      padding: "8px 12px",
      background: "#131B25",
      border: "1px solid #28394E",
      borderRadius: "4px",
      color: "#c0c4cc",
      fontSize: "14px",
      textAlign: "left",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      outline: "none",
    },
    dropdown: (position) => ({
      position: "absolute",
      ...(position === "top"
        ? { bottom: "calc(100% + 4px)" }
        : { top: "calc(100% + 4px)" }),
      left: 0,
      width: "100%",
      background: "#131B25",
      border: "1px solid #28394E",
      borderRadius: "4px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
    }),
    option: {
      padding: "8px 12px",
      color: "#c0c4cc",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      margin: "0 5px",
      borderRadius: "5px",
    },
    arrow: {
      width: "12px",
      height: "12px",
      opacity: 0.6,
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s",
    },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if there's enough space below
      const spaceBelow = windowHeight - selectRect.bottom;
      const spaceNeeded = dropdownRect.height + 4; // 4px for gap

      setDropdownPosition(spaceBelow >= spaceNeeded ? "bottom" : "top");
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { value: option } });
    }
  };

  const handleOptionHover = (e) => {
    e.target.style.backgroundColor = "#424D59";
  };

  const handleOptionLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
  };

  return (
    <div ref={selectRef} style={styles.container}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.button}>
        <span>{selectedOption}</span>
        <svg
          style={styles.arrow}
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 18L6 9h12l-6 9z" />
        </svg>
      </button>

      {isOpen && (
        <div ref={dropdownRef} style={styles.dropdown(dropdownPosition)}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              onMouseEnter={handleOptionHover}
              onMouseLeave={handleOptionLeave}
              style={styles.option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DownloadSelect = ({ onChange, stageRef, subscriptionLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleDownload = (value) => {
    if (value === "JPG") {
      downloadAsJPG(stageRef);
    } else if (value === "PDF") {
      downloadAsPDF(stageRef);
    }
    setIsOpen(false);
  };

  const styles = {
    container: {
      position: "relative",
      width: "200px",
    },
    buttonContainer: {
      display: "flex",
      backgroundColor: "#008281",
      borderRadius: "8px",
      overflow: "hidden",
      border: "1px solid #28394E",
      transition: "border-color 0.2s",
    },
    mainButton: {
      flex: 1,
      padding: "10px 16px",
      color: "#fff",
      textAlign: "left",
      borderRight: "1px solid #fff",
      cursor: "pointer",
      border: "none",
      background: "transparent",
      outline: "none",
    },
    toggleButton: {
      width: "36px",
      padding: "10px 8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
      cursor: "pointer",
      background: "transparent",
      border: "none",
      color: "#fff",
    },
    dropdown: (position) => ({
      position: "absolute",
      ...(position === "top"
        ? { bottom: "calc(100% + 4px)" }
        : { top: "calc(100% + 4px)" }),
      left: 0,
      width: "100%",
      background: "#131B25",
      border: "1px solid #28394E",
      borderRadius: "6px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
      overflow: "hidden",
    }),
    option: {
      padding: "12px 16px",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      backgroundColor: "transparent",
      border: "none",
      width: "100%",
      textAlign: "left",
      borderRadius: "5px",
    },
    disabledOption: {
      padding: "12px 16px",
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "14px",
      backgroundColor: "transparent",
      border: "none",
      width: "100%",
      textAlign: "left",
      cursor: "not-allowed",
    },
    arrow: {
      width: "12px",
      height: "12px",
      opacity: 0.8,
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s",
    },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const spaceBelow = windowHeight - selectRect.bottom;
      const spaceNeeded = dropdownRect.height + 4;

      setDropdownPosition(spaceBelow >= spaceNeeded ? "bottom" : "top");
    }
  }, [isOpen]);

  const handleOptionHover = (e) => {
    if (e.target.getAttribute("data-disabled") !== "true") {
      e.target.style.backgroundColor = "#424D59";
    }
  };

  const handleOptionLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={selectRef} style={styles.container}>
      <div style={styles.buttonContainer}>
        <button style={styles.mainButton} onClick={toggleDropdown}>
          Download
        </button>
        <button style={styles.toggleButton}>
          <svg
            style={styles.arrow}
            fill="currentColor"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 18L6 9h12l-6 9z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div ref={dropdownRef} style={styles.dropdown(dropdownPosition)}>
          <button
            style={
              subscriptionLevel === 1 ? styles.disabledOption : styles.option
            }
            onClick={() => subscriptionLevel !== 1 && handleDownload("JPG")}
            onMouseEnter={handleOptionHover}
            onMouseLeave={handleOptionLeave}
            data-disabled={subscriptionLevel === 1}
          >
            Download as JPG
          </button>
          <button
            style={
              subscriptionLevel === 1 ? styles.disabledOption : styles.option
            }
            onClick={() => subscriptionLevel !== 1 && handleDownload("PDF")}
            onMouseEnter={handleOptionHover}
            onMouseLeave={handleOptionLeave}
            data-disabled={subscriptionLevel === 1}
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export { CustomSelect, DownloadSelect };
