import interact from "interactjs";
import dragMoveListener from "./dragMoveListener";

import selectElement from "./selectElement";

const createText = (textPos, stageDiv, tInfo) => {
  const textLabel = document.createElement("input");
  // textLabel.classList.add("placeholder");
  // textLabel.contentEditable = "true";
  textLabel.placeholder = "Add Label";
  textLabel.style.position = "absolute";
  textLabel.style.border = "none";
  textLabel.style.minWidth = "1ch";

  textLabel.addEventListener("input", () => {
    textLabel.style.width = textLabel.value.length + 2 + "ch";
  });

  if (tInfo === undefined) {
    const initialWidth = 120;
    textLabel.style.width = `${initialWidth}px`;
    textLabel.style.height = `${initialWidth * 0.4}px`;
  } else {
    textLabel.style.width = tInfo.width;
    textLabel.style.height = tInfo.height;
    textLabel.value = tInfo.content;
    textLabel.classList.remove("placeholder");
  }

  textLabel.style.left = `${
    textPos.x - parseFloat(textLabel.style.width) / 2
  }px`;

  const initialTop = textPos.y - parseFloat(textLabel.style.height) / 2;
  const topCritiria =
    stageDiv.clientHeight - parseFloat(textLabel.style.height);

  textLabel.style.top =
    topCritiria > initialTop ? `${initialTop}px` : `${topCritiria}px`;
  textLabel.classList.add("text-mark");

  textLabel.addEventListener("focus", () => {
    if (textLabel.classList.contains("placeholder")) {
      textLabel.classList.remove("placeholder");
      textLabel.value = "";
    }
  });

  textLabel.addEventListener("blur", () => {
    if (textLabel.value.trim() === "") {
      textLabel.classList.add("placeholder");
      textLabel.value = "Add Label";
    }
  });

  textLabel.addEventListener("click", (e) => {
    e.stopPropagation();
    selectElement(textLabel);
  });

  stageDiv.appendChild(textLabel);

  interact(textLabel).draggable({
    listeners: { move: dragMoveListener },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "#stage",
        endOnly: true,
      }),
    ],
  });
  // .resizable({
  //   edges: { left: true, right: true, bottom: true, top: true },
  //   modifiers: [interact.modifiers.restrictEdges({ outer: "#stage" })],
  // })
  // .on("resizemove", (event) => {
  //   const { width, height } = event.rect;
  //   textLabel.style.width = `${width}px`;
  //   textLabel.style.height = `${height}px`;
  //   resizeTextToFitProportionally(textLabel, width, height);
  // });
};

const resizeTextToFitProportionally = (element, width, height) => {
  const baseFontSize = 36;
  const scaleFactor = Math.min(width / 200, height / 40);
  element.style.fontSize = `${baseFontSize * scaleFactor}px`;
};

export default createText;
