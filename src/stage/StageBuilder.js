import React, { useEffect, useRef, useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import "../App.css";
import LeftSidebar from "./LeftSidebar";

import createImage from "./functions/createImage";
import createText from "./functions/createText";
import selectElement from "./functions/selectElement";
import createGrids from "./functions/createGrids";
import importData from "./functions/importData";

import saveCurrentWorkState from "./functions/saveCurrentWorkState";
import importPrevWorkState from "./functions/importPrevWorkState";
import { getNestedList } from "./helper";
import { CustomSelect, DownloadSelect } from "./CustomSelect";
import { FaRegSave } from "react-icons/fa";
import { TbFileDownload } from "react-icons/tb";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#131B25",
    color: "FFFFFF",
    maxWidth: 220,
    fontSize: "1rem",
    border: "1px solid #28394E",
  },
}));

const numOfRows = 13;

const vocals = [
  "Vocal",
  "Guitar",
  "Bass",
  "Keys",
  "Horn",
  "Percussion",
  "Kick",
  "Snare",
  "Hi-Hat",
  "Ride",
  "Crash",
  "Tom",
  "Overhead",
  "Media Player",
];

const vocalMics = [
  "Vocal Mic",
  "Amp Mic",
  "Guitar Mic",
  "Drum Mic",
  "DI XLR",
  "DI 1/4",
];

const tableStyles = {
  tableContainer: {
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1C2938",
    borderRight: "1px solid #28394E",
  },
  th: {
    padding: "0.1rem",
    fontWeight: "normal",
    fontSize: "14px",
    color: "#a0aec0",
    backgroundColor: "#1C2938",
    borderBottom: "1px solid #28394E",
  },
  td: {
    padding: "0.1rem",
    color: "#a0aec0",
    borderBottom: "1px solid #28394E",
    cursor: "pointer",
  },
};

const StageBuilder = () => {
  //*************************** title */
  const [title, setTitle] = useState("");
  const [imageList, setImageList] = useState([]);
  const [dropCount, setDropCount] = useState(0);
  const titleRef = useRef(null);

  //*************************** title */
  const [subscriptionLevel, setSubscriptionLevel] = useState(null);

  useEffect(() => {
    const level = new URLSearchParams(window.location.search).get("subs");
    setSubscriptionLevel(Number(level));
  }, []);
  //*************************** drag and drop */
  const imageRef = useRef(null);
  const stageRef = useRef(null);
  const designAreaRef = useRef(null);

  useEffect(() => {
    const imageListRes = getNestedList();
    setImageList(imageListRes);
  }, []);

  const handleDrop = (e) => {
    if (imageRef.current === null) return;

    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position relative to the component
    const y = e.clientY - rect.top; // Y position relative to the component

    if (imageRef.current === "textLabel") {
      createText({ x: x, y: y }, designAreaRef.current);
    } else {
      createImage(
        { x: x, y: y, image: imageRef.current },
        designAreaRef.current
      );
    }

    setDropCount((prev) => prev + 1);

    imageRef.current = null;
  };

  const cancelSelected = () => {
    const imageElement = document.querySelector(".delete-mark");
    document.getElementById("add-input-button").innerText = "Add Input";
    indexOfArray.current = null;
    if (imageElement === null) return;
    if (imageElement.classList.contains("selected")) {
      imageElement.classList.remove("selected");
    }
    imageElement.classList.remove("delete-mark");
  };
  //*************************** drag and drop */

  //*************************** table */
  let indexOfArray = useRef(null);

  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Vocal");
  const [input, setInput] = useState("Vocal Mic");

  const grids = createGrids(entries);

  const handleTableRow = (e, index, i) => {
    e.stopPropagation();
    indexOfArray.current = index * numOfRows + i;

    const row = entries[indexOfArray.current];
    if (!!row === false) {
      cancelSelected();
      return;
    }

    const element = document.getElementById(`tr-${indexOfArray.current}`);
    selectElement(element);

    setName(row.name);
    setType(row.type);
    setInput(row.input);
  };

  const addEntry = () => {
    if (document.getElementById("add-input-button").innerText === "Add Input") {
      if (name && type && input) {
        const newEntries = [...entries];
        newEntries.push({
          name,
          type,
          input,
        });
        setEntries(newEntries);

        // setName("Gary");
        setName("");
        setType(type);
        setInput(input);
      }
    } else {
      const newEntries = [...entries];
      newEntries[indexOfArray.current] = { name, type, input };
      setEntries(newEntries);
      document.getElementById("add-input-button").innerText = "Add Input";
    }
  };

  const deleteEntry = () => {
    if (indexOfArray.current === null) return;
    const newEntries = [...entries];
    delete newEntries[indexOfArray.current];
    setEntries(newEntries.filter((a) => a != null));

    cancelSelected();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        deleteEntry();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [entries]);
  //*************************** table */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Delete") {
      const element = document.querySelector(".delete-mark");

      if (element === null) return;

      if (element.id.includes("tr-")) return;

      indexOfArray.current = null;
      element.remove();
    }
  });

  //*************************** data import */
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    if (jsonData === null) return;
    importPrevWorkState(jsonData, imageList, designAreaRef.current);
    setEntries(jsonData.entries);
    setTitle(jsonData.title);
  }, [jsonData]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result); // Parse the JSON data
          setJsonData(data);
        } catch (error) {
          alert("Invalid JSON file!");
        }
      };

      reader.onerror = () => {
        alert("Error reading file");
      };

      reader.readAsText(file);
    } else {
      alert("Please select a valid JSON file");
    }
  };
  //*************************** data import */

  return (
    <div className="position-relative">
      <img
        src="/music.svg"
        style={{ position: "absolute", top: 20, right: 40, zIndex: 9999 }}
        alt="favicon"
      />
      <div className="d-flex justify-content-between pt-1 text-center">
        <LeftSidebar iRef={imageRef} imageList={imageList} />

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: "1",
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            ref={stageRef}
            onClick={cancelSelected}
          >
            <div
              id="stage"
              ref={designAreaRef}
              style={{
                flex: 1,
                // overflow: "auto",
              }}
            >
              <div
                id="title"
                ref={titleRef}
                contentEditable
                suppressContentEditableWarning={true}
                style={{ fontSize: "32px", border: "none", outline: "none" }}
                className="editable-div"
              >
                {title}
              </div>
            </div>

            {dropCount === 0 && jsonData === null && (
              <div
                className="rounded flex dragAndDrop"
                style={{
                  flex: 1,
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  height: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70vw",
                  transform: "translate(-50%, -20%)",
                }}
              >
                <p
                  style={{
                    fontSize: "32px",
                    maxWidth: "300px",
                    color: "#8D949B",
                    opacity: "70%",
                  }}
                >
                  Drag items from sidebar here
                </p>
              </div>
            )}

            <div
              style={{
                backgroundColor: "#1C2938",
                color: "white",
              }}
              id="input-table"
              className="d-flex align-items-end"
            >
              <div className="w-100 d-flex">
                {grids &&
                  grids.map((grid, index) => (
                    <table
                      key={index}
                      id={`table-${index}`}
                      style={tableStyles.table}
                      className="m-0"
                    >
                      <thead>
                        {grid.length > 0 && (
                          <tr
                            style={{
                              fontSize: "12px",
                            }}
                            className=""
                          >
                            <th style={tableStyles.th}>NO</th>
                            <th style={tableStyles.th}>NAME</th>
                            <th style={tableStyles.th}>TYPE</th>
                            <th style={tableStyles.th}>INPUT</th>
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {grid.map((entry, i) => (
                          <tr
                            key={i}
                            id={`tr-${index * numOfRows + i}`}
                            onClick={(e) => handleTableRow(e, index, i)}
                            style={{
                              "&:hover": {
                                backgroundColor: "#008281",
                              },
                            }}
                          >
                            {entry !== null ? (
                              <>
                                <td style={tableStyles.td}>
                                  {i + index * 10 + 1}
                                </td>
                                <td style={tableStyles.td}>{entry.name}</td>
                                <td style={tableStyles.td}>{entry.type}</td>
                                <td style={tableStyles.td}>{entry.input}</td>
                              </>
                            ) : (
                              <>
                                <td style={tableStyles.td}>
                                  {" "}
                                  {i + index * 10 + 1}{" "}
                                </td>
                                <td style={tableStyles.td}> - </td>
                                <td style={tableStyles.td}> - </td>
                                <td style={tableStyles.td}> - </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ))}
              </div>
              {subscriptionLevel === 1 && <WaterMark />}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#1C2938",
              color: "white",
              padding: "0.85rem 12px",
            }}
            id="control-area"
            className="d-flex control-area justify-content-between align-items-center"
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                gap: "5px",
              }}
              id="table-controllers"
            >
              <input
                type="text"
                placeholder="Name"
                className="inner-text p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  backgroundColor: "#131B25",
                  border: "1px solid #28394E",
                  borderRadius: "8px",
                  color: "white",
                  width: "220px",
                }}
              />

              <CustomSelect
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={vocals}
              />

              <CustomSelect
                value={input}
                onChange={(e) => setInput(e.target.value)}
                options={vocalMics}
              />

              <button
                id={"add-input-button"}
                type="submit"
                onClick={addEntry}
                className="rounded p-2"
                style={{
                  backgroundColor: "#008281",
                  cursor: "pointer",
                  color: "white",
                  border: "1px solid #28394E",
                }}
              >
                Add Input
              </button>
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              id="stage-controllers"
              style={{
                gap: "5px",
              }}
            >
              <CustomTooltip title="Import Design">
                <button
                  className="rounded pt-1"
                  style={{
                    backgroundColor: "#008281",
                    cursor: "pointer",
                    color: "white",
                    border: "1px solid #28394E",
                  }}
                  onClick={importData}
                >
                  <TbFileDownload
                    style={{
                      fontSize: "28px",
                    }}
                  />
                </button>
              </CustomTooltip>

              <input
                id="file-input"
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              <CustomTooltip title="Save Design">
                <button
                  className="rounded pt-1"
                  style={{
                    backgroundColor: "#008281",
                    cursor: "pointer",
                    color: "white",
                    border: "1px solid #28394E",
                  }}
                  onClick={() => saveCurrentWorkState(entries)}
                >
                  <FaRegSave
                    style={{
                      fontSize: "28px",
                    }}
                  />
                </button>
              </CustomTooltip>

              <DownloadSelect
                stageRef={stageRef}
                subscriptionLevel={subscriptionLevel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WaterMark = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        position: "absolute",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: "10rem",
          color: "gray",
          transform: "rotate(-45deg)",
          opacity: 0.2,
        }}
      >
        BandBreeze
      </div>
      <div
        style={{
          fontSize: "10rem",
          color: "gray",
          transform: "rotate(-45deg)",
          opacity: 0.2,
          marginTop: "10rem",
        }}
      >
        BandBreeze
      </div>
      <div
        style={{
          fontSize: "10rem",
          color: "gray",
          transform: "rotate(-45deg)",
          opacity: 0.2,
          marginTop: "10rem",
        }}
      >
        BandBreeze
      </div>
    </div>
  );
};

export default StageBuilder;
