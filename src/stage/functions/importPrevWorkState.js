import createImage from "./createImage";
import createText from "./createText";

const importPrevWorkState = async (data, imageList, stageDiv) => {
  if (data === null) return;
  importImage(data.images, imageList, stageDiv);
  importTexts(data.texts, stageDiv);
};
const importImage = (data, imageList, stageDiv) => {
  if (data.length === 0) return;
  const imageInfo = data;

  for (let index in imageInfo) {
    const [instrumentFromData, imageNameFromData] =
      imageInfo[index].srcId.split("-").slice(1) || [];
    const instrument =
      Object.keys(imageList).find((dir) => dir === instrumentFromData) || "";
    const imageName = instrument
      ? imageList[`${instrument}`].find((image) => image === imageNameFromData)
      : "";

    if (instrument && imageName) {
      const image = document.createElement("img");

      image.id = `image-${instrument}-${imageName}`;
      image.src = `/images/stage-plot/${instrument}/${imageName}`;
      image.alt = `image-${instrument}-${imageName}`;
      const x =
        parseFloat(imageInfo[index].left) +
        parseFloat(imageInfo[index].width) / 2;
      const y =
        parseFloat(imageInfo[index].top) +
        parseFloat(imageInfo[index].height) / 2;
      const iInfo = {
        width: imageInfo[index].width,
        height: imageInfo[index].height,
      };

      createImage({ x: x, y: y, image: image }, stageDiv, iInfo);
    }
  }
};

const importTexts = (data, stageDiv) => {
  if (data.length === 0) return;
  const textInfo = data;

  for (let index in textInfo) {
    const x =
      parseFloat(textInfo[index].left) + parseFloat(textInfo[index].width) / 2;
    const y =
      parseFloat(textInfo[index].top) + parseFloat(textInfo[index].height) / 2;
    const tInfo = {
      width: textInfo[index].width,
      height: textInfo[index].height,
      content: textInfo[index].content,
    };
    createText({ x: x, y: y }, stageDiv, tInfo);
  }
};

export default importPrevWorkState;
