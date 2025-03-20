'use client';
import { useState } from "react";
import FileUploader from "./Components/ui/FileUploader";
import PdfViewer from "./Components/PdfViewer";

export default function Home() {
  let [ pdf , setPdf ] = useState<string>('');
  const handlePdf = (pdf: string) => {
    console.log(pdf);
    setPdf(pdf);
  }
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {pdf ? (
        <PdfViewer filePath={pdf} />
      ) : (
        <div className="h-full w-full md:flex-1 flex flex-col items-center justify-center p-4 md:p-8">
          <img src="/next.svg" alt="Logo" className="mb-4 w-24 h-24 md:w-32 md:h-32" />
          <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-6 md:mb-8">Chat with any PDF</h1>
          <div className="w-full max-w-sm md:max-w-2xl h-[180px] md:h-[200px]">
            <FileUploader handlePdf={handlePdf} />
          </div>
        </div>
      )}
      <div className="h-screen md:h-full md:flex-1 bg-green-500">
        <div className="w-full h-full flex items-center justify-center text-white text-xl md:text-2xl font-bold">
          PDF Chat Section
        </div>
      </div>
    </div>
  );
}
