import interact from "interactjs";
import dragMoveListener from "./dragMoveListener";

import selectElement from "./selectElement";

const createImage = (imageInfo, stageDiv, iInfo) => {
  const droppedImage = document.createElement("img");
  droppedImage.src = imageInfo.image.src;
  const aspectRatio = iInfo
    ? parseFloat(iInfo.height) / parseFloat(iInfo.width)
    : droppedImage.naturalHeight / droppedImage.naturalWidth;

  console.log(aspectRatio, imageInfo);
  droppedImage.style.width = `100%`;
  droppedImage.style.height = "100%";
  droppedImage.id = imageInfo.image.id;

  const resizableBox = document.createElement("div");
  resizableBox.style.position = "absolute";

  if (iInfo === undefined) {
    const initialWidth = 80;
    resizableBox.style.width = `${initialWidth}px`;
    resizableBox.style.height = `${initialWidth * aspectRatio}px`;
  } else {
    resizableBox.style.width = iInfo.width;
    resizableBox.style.height = iInfo.height;
  }

  resizableBox.style.left = `${
    imageInfo.x - parseFloat(resizableBox.style.width) / 2
  }px`;
  const initialTop = imageInfo.y - parseFloat(resizableBox.style.height) / 2;
  const topCritiria =
    stageDiv.offsetHeight - parseFloat(resizableBox.style.height);

  console.log(
    initialTop,
    topCritiria,
    stageDiv.clientHeight,
    stageDiv.naturalHeight,
    stageDiv
  );

  resizableBox.style.top =
    topCritiria > initialTop ? `${initialTop}px` : `${topCritiria}px`;

  resizableBox.classList.add("image-wrapper");

  resizableBox.addEventListener("click", (e) => {
    e.stopPropagation();
    selectElement(resizableBox);
  });

  resizableBox.appendChild(droppedImage);

  stageDiv.appendChild(resizableBox);

  interact(resizableBox)
    .draggable({
      listeners: { move: dragMoveListener },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "#stage",
          endOnly: true,
        }),
      ],
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      modifiers: [
        interact.modifiers.restrictEdges({ outer: "#stage" }),
        interact.modifiers.aspectRatio({ ratio: aspectRatio }),
      ],
    })
    .on("resizemove", function (event) {
      const { width, height } = event.rect;
      resizableBox.style.width = `${width}px`;
      resizableBox.style.height = `${height}px`;
    });
};

export default createImage;
