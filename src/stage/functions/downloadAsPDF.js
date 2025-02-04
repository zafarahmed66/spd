import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { removeBorder } from "./removeBorder";

const downloadAsPDF = async (stageRef) => {
  try {
    removeBorder();

    const element = stageRef.current;

    const tables = document.querySelectorAll("table");
    const originalBackgroundColors = [];

    tables.forEach((table, index) => {
      originalBackgroundColors[index] = table.style.backgroundColor;
      table.style.backgroundColor = "white";
    });

    const canvas = await html2canvas(element, { scale: 2 }); // Higher scale improves resolution
    const imageData = canvas.toDataURL("image/png"); // Convert to image data

    tables.forEach((table, index) => {
      table.style.backgroundColor = originalBackgroundColors[index];
    });

    const pdf = new jsPDF({
      orientation: "landscape", // or 'landscape' depending on your layout
      unit: "px", // Use pixels for consistent scaling
      format: [canvas.width, canvas.height], // Match canvas size to PDF
    });
    pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);

    if (window.showSaveFilePicker) {
      const handle = await showSaveFilePicker({
        suggestedName: "stage-plot-document.pdf",
        types: [
          {
            description: "PDF Documents",
            accept: {
              "application/pdf": [".pdf"],
            },
          },
        ],
      });
      const writable = await handle.createWritable();
      const pdfblob = pdf.output("blob");
      await writable.write(pdfblob);
      writable.close();
    } else {
      pdf.save("stage-plot-document"); // Save the PDF
    }

    alert("PDF saved successfully!");
  } catch (error) {
    console.error("Failed to save as PDF:", error);
  }
};

export default downloadAsPDF;
