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
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    pageRefs.current = new Array(numPages).fill(null);
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNumber = Number(entry.target.getAttribute('data-page-number'));
            if (pageNumber) setCurrentPage(pageNumber);
          }
        });
      },
      { threshold: 0.5 }
    );

    pageRefs.current.forEach((ref, index) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [numPages]);

  return (
    <div className="w-full md:w-1/2 lg:w-[45%] p-4 md:p-[30px] h-full flex flex-col relative">
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={() => setScale(scale => Math.max(0.5, scale - 0.2))}
          className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-full border border-gray-300"
        >
          -
        </button>
        <button
          onClick={() => setScale(1)}
          className="px-3 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-md border border-gray-300 text-sm"
        >
          Reset
        </button>
        <button
          onClick={() => setScale(scale => Math.min(2, scale + 0.2))}
          className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-full border border-gray-300"
        >
          +
        </button>
        <div className="px-3 h-8 flex items-center justify-center text-black border-gray-300 text-sm">
          {currentPage} / {numPages}
        </div>
      </div>
      <div className="flex-1 overflow-auto mt-16">
        <Document
          file={filePath ? `assets/Aditya_Bhargava_-_Grokking_Algorithms__An_illustrated_guide_for_programmers_and_other_curious_people-Manning_Publications_(2016).pdf` : file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-gray-600">Loading PDF...</div>}
          onScroll={({ page }) => setCurrentPage(page)}
          error={<div className="text-red-500">Error loading PDF!</div>}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div
              key={`page_${index + 1}`}
              ref={(el: HTMLDivElement | null) => {
                pageRefs.current[index] = el;
              }}
              data-page-number={index + 1}
            >
              <Page pageNumber={index + 1} scale={scale} />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;