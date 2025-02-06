import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { removeBorder } from "./removeBorder";

const downloadAsPDF = async (stageRef) => {
  try {
    removeBorder();

    const element = stageRef.current;

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

    const canvas = await html2canvas(element, { scale: 2 }); // Higher scale improves resolution
    const imageData = canvas.toDataURL("image/png");

    tables.forEach((table, index) => {
      table.style.backgroundColor = originalBackgroundColors[index];
    });

    td.forEach((td) => {
      td.style.color = "#a0aec0";
    });

    th.forEach((th) => {
      th.style.color = "#a0aec0";
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // A4 dimensions in mm
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate scaling to fit the image while maintaining aspect ratio
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    
    // Calculate centered position
    const x = (pageWidth - imgWidth * ratio) / 2;
    const y = (pageHeight - imgHeight * ratio) / 2;

    pdf.addImage(imageData, "PNG", x, y, imgWidth * ratio, imgHeight * ratio);

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
