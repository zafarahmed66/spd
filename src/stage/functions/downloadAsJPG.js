import html2canvas from "html2canvas";
import { removeBorder } from "./removeBorder";

const downloadAsJPG = async (stageRef) => {
  try {
    removeBorder();

    const tables = document.querySelectorAll("table");
    const td = document.querySelectorAll("td");
    const th = document.querySelectorAll("th");
    const originalBackgroundColors = [];

    tables.forEach((table, index) => {
      originalBackgroundColors[index] = table.style.backgroundColor;
      table.style.backgroundColor = "white";
    });

    td.forEach((td) => {
      td.style.color = "black";
    });

    th.forEach((th) => {
      th.style.color = "white";
    });

    const canvas = await html2canvas(stageRef.current, { useCORS: true });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    tables.forEach((table, index) => {
      table.style.backgroundColor = originalBackgroundColors[index];
    });

    td.forEach((td) => {
      td.style.color = "#a0aec0";
    });

    th.forEach((th) => {
      th.style.color = "#a0aec0";
    });

    // Convert the data URL to a Blob
    const byteString = atob(imgData.split(",")[1]);
    const mimeString = imgData.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    if (window.showSaveFilePicker) {
      const handle = await showSaveFilePicker({
        suggestedName: "stage-plot.jpg",
        types: [
          {
            description: "JPEG Images",
            accept: {
              "image/jpeg": [".jpg", ".jpeg"],
            },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      writable.close();
    } else {
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "stage-plot.jpg";
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }

    alert("JPG saved successfully!");
  } catch (error) {
    console.error("Failed to save as JPG:", error);
  }
};

export default downloadAsJPG;
