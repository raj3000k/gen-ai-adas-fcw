// src/components/GeneratedCodeView.js
import React from "react";

const GeneratedCodeView = ({ generatedCode }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col">
      <h3 className="text-xl font-semibold mb-4">Generated Code</h3>
      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm max-w-full overflow-x-auto">
        <pre>{generatedCode || "// Generated code will appear here..."}</pre>
      </div>

    </div>
  );
};

export default GeneratedCodeView;
