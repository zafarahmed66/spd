import { useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FaPlus } from "react-icons/fa6";
import { sidebarIcons } from "./helper";

const LeftSidebar = ({ iRef, imageList }) => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div
      className="pt-1 d-flex flex-column position-relative border-right"
      style={{
        width: "25%",
        backgroundColor: "#1C2938",
        color: "white",
        height: "100vh"
      }}
    >
      <SimpleTreeView
        className="w-100 flex-grow-1"
        style={{ position: "relative" }}
        sx={{ "& .MuiTreeItem-iconContainer": { order: 2 } }}
      >
        <div className="d-flex justify-content-center align-items-center p-2">
          <div>
            <h4 className="text-start">
              <b>BAND BREEZE</b>
            </h4>
            <h6 className="d-flex text-start">Stage Plot Designer</h6>
          </div>
        </div>

        <div
          className="border rounded m-2 p-1 d-flex justify-content-center align-items-center"
          draggable="true"
          onDragStart={() => {
            iRef.current = "textLabel";
          }}
          style={{
            backgroundColor: "#008281",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <FaPlus /> <span> Add Label</span>
        </div>

        <div
          style={{
            overflowY: "scroll",
            height: "77vh",
          }}
        >
          {Object.keys(imageList).map((dir, key) => {
            const itemId = `instrument-${dir}`;
            const label = dir.charAt(0).toUpperCase() + dir.slice(1);
            const IconComponent = sidebarIcons[dir];
            return (
              <TreeItem
                itemId={itemId}
                key={`instrument-${key}`}
                disabled={imageList[dir].length === 0}
                style={{
                  backgroundColor:
                    activeItem === itemId ? "#008281" : "transparent",
                  cursor: "pointer",
                }}
                className="mx-2 rounded"
                onClick={() => setActiveItem(itemId)}
                label={
                  <div className="d-flex align-items-center p-2">
                    {IconComponent && <IconComponent className="mx-2" />}
                    <span>{label}</span>
                  </div>
                }
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                    padding: "8px",
                  }}
                >
                  {imageList[dir].map((image, index) => (
                    <div
                      key={`image-${dir}-${index}`}
                      style={{ backgroundColor: "#006C6C" }}
                      className="rounded p-2"
                    >
                      <img
                        id={`image-${dir}-${image}`}
                        src={`/images/stage-plot/${dir}/${image}`}
                        alt={`image-${dir}-${index}`}
                        width="80%"
                        draggable="true"
                        onDragStart={(e) => {
                          iRef.current = e.target;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </TreeItem>
            );
          })}
        </div>
      </SimpleTreeView>

      <div
        className="w-100 d-flex border-top py-4 position-absolute"
        style={{
          bottom: "0",
          justifyContent: "space-evenly",
          backgroundColor: "#1C2938",
          zIndex: 100,
        }}
      >
        <a
          href="https://www.bandbreeze.com/demo-reel-builder-tutorial"
          style={{ color: "white" }}
        >
          Tutorial
        </a>
        <a
          href="https://www.bandbreeze.com/professional-services"
          style={{ color: "white" }}
        >
          Services
        </a>
        <a href="https://www.bandbreeze.com/" style={{ color: "white" }}>
          Home
        </a>
      </div>
    </div>
  );
};

export default LeftSidebar;
