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
    <div className="flex flex-row h-screen w-full">
      {/* <div className="bg-red-500 h-full w-[450px]">
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">Section</div>
      </div> */}
      {pdf ? <PdfViewer filePath={pdf} /> : <div className="h-full flex-1 flex flex-col items-center justify-center p-8">
        <img src="/next.svg" alt="Logo" className="mb-4 w-32 h-32" />
        <h1 className="text-3xl font-bold text-center text-black mb-8">Chat with any PDF</h1>
        <div className="w-full max-w-2xl h-[200px]">
          <FileUploader handlePdf={handlePdf} />
        </div>
      </div>}
      <div className="bg-green-500 h-full flex-1">
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
          PDF Chat Section
        </div>
      </div>
    </div>
  );
}
