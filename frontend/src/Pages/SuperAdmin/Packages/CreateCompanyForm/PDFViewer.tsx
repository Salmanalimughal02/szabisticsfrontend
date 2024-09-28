// import saveAs from "file-saver";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: any;
  name: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, name }) => {
  // console.log("file", file);
  // console.log("file", file);

  const [numPages, setNumPages] = useState<number>(0);

  //   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
  //     setNumPages(numPages);
  //   };

  const [image, setImage] = useState<string | null>(null);

  const onDocumentLoadSuccess = async ({ numPages }: { numPages: number }) => {
    try {
      const pdf = await pdfjs.getDocument(file).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      if (!context) {
        throw new Error("Canvas context is null");
      }
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      const imgData = canvas.toDataURL();
      setImage(imgData);
    } catch (error) {
      // console.error("Error rendering PDF:", error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const fileUrl = URL.createObjectURL(file);
    window.open(fileUrl, "_blank");
  };

  return (
    // <div style={{ width: "230px", height: "160px" }}>
    //   <div>{name}</div>
    //   <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
    //     {Array.from(new Array(numPages), (el, index) => (
    //       <Page key={`page_${index + 1}`} pageNumber={index + 1} />
    //     ))}
    //   </Document>
    //   <button onClick={handleDownload}>Download</button>
    // </div>
    <div
      style={{
        width: "300px",
        cursor: "pointer",
      }}
      onClick={handleClick} // Add onClick event handler
    >
      {image && <img src={image} alt="First Page" />}
      <div
        style={{
          height: "160px",
          overflow: "hidden", // Changed from "scroll" to "hidden"
          border: "1px solid lightgray",
        }}
      >
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} width={300} />
        </Document>
      </div>
      <div
        style={{
          padding: "8px 15px",
          fontSize: "16px",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          overflow: "clip",
        }}
        className="btn-primary"
      >
        {file.name.toString()}
      </div>
    </div>
  );
};

export default PDFViewer;
