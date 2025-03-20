'use client';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://react-pdf.org/_next/static/media/pdf.worker.min.02a0ad5e.mjs`;
interface PdfViewerProps {
  file?: string;
  filePath?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file, filePath }) => {
  const [scale, setScale] = React.useState(1);
  const [numPages, setNumPages] = React.useState(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-[40%] p-[50px] h-full flex flex-col relative">
       <div className="mt-4 flex items-center gap-4 sticky right-1 bottom-0 bg-white p-2 border-t">
        <button
          onClick={() => setScale(scale => Math.max(0.5, scale - 0.2))}
          className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-full border border-gray-300"
        >
          -
        </button>
        <button
          onClick={() => setScale(1)}
          className="w-8 h-8 flex items-center justify-center text-black border-gray-300"
        >
          Reset
        </button>
        <button
          onClick={() => setScale(scale => Math.min(2, scale + 0.2))}
          className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-full border border-gray-300"
        >
          +
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <Document
          file={filePath ? `assets/Aditya_Bhargava_-_Grokking_Algorithms__An_illustrated_guide_for_programmers_and_other_curious_people-Manning_Publications_(2016).pdf` : file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-gray-600">Loading PDF...</div>}
          error={<div className="text-red-500">Error loading PDF!</div>}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;