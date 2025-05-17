import React from "react";
import { handleCopy, handlePrint, handleToCSV, handleExcel, handleToPdf } from "../../util/export";
import icons from "../../util/icon";

const { FaCopy, FaFileExcel, FaFilePdf, FaPrint, FaFileCsv } = icons;

function CopyPrintComponent({ data, type }) {
    return (
        <div className="flex flex-wrap justify-center gap-2">
            <button
                onClick={() => handleCopy(data, type)}
                className="flex items-center rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
                <FaCopy className="mr-2" />
                Copy
            </button>
            <button
                onClick={() => handleExcel(data, type)}
                className="flex items-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
            >
                <FaFileExcel className="mr-2" />
                Excel
            </button>
            <button
                onClick={() => handleToPdf(data, type)}
                className="flex items-center rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
                <FaFilePdf className="mr-2" />
                PDF
            </button>
            <button
                onClick={() => handleToCSV(data, type)}
                className="flex items-center rounded bg-amber-300 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-400"
            >
                <FaFileCsv className="mr-2" />
                CSV
            </button>
            <button
                onClick={() => handlePrint(type)}
                className="flex items-center rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
            >
                <FaPrint className="mr-2" />
                Print
            </button>
        </div>
    );
}

export default CopyPrintComponent;
