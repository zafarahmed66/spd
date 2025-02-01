import { removeBorder } from "./removeBorder";

const saveCurrentWorkState = async (entries) => {
  removeBorder();

  const title = document.getElementById("title")
    ? document.getElementById("title").innerText
    : "";
  

  const images = getImages();

  const texts = getTexts();

  try {
    const data = {
      title,
      images,
      texts,
      entries,
    };

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });

    if (window.showSaveFilePicker) {
      const handle = await showSaveFilePicker({
        suggestedName: "data.json",
        types: [
          {
            description: "JSON File",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } else {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.json"; // Name of the downloaded file
      link.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  } catch (error) {
    console.log("Failed to save the current work state:", error);
  }
};

const getImages = () => {
  let images = [];
  const imgArray = document.querySelectorAll(".image-wrapper");
  for (let img of imgArray) {
    images.push({
      width: img.style.width,
      height: img.style.height,
      left: img.style.left,
      top: img.style.top,
      srcId: img.children[0].id,
    });
  }
  return images;
};

const getTexts = () => {
  let texts = [];
  const txtArray = document.querySelectorAll(".text-mark");
  for (let txt of txtArray) {
    console.log(txt.value, "========");
    if (txt.value.trim() !== "Add Label") {
      texts.push({
        width: txt.style.width,
        height: txt.style.height,
        left: txt.style.left,
        top: txt.style.top,
        content: txt.value,
      });
    }
  }
  return texts;
};

export default saveCurrentWorkState;
