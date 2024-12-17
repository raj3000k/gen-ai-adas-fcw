// src/components/TestResults.js
import React from "react";

const TestResults = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Test Results</h3>
      <ul className="list-disc list-inside">
        <li>Test case 1: Passed</li>
        <li>Test case 2: Failed</li>
        <li>Test case 3: Passed</li>
      </ul>
    </div>
  );
};

export default TestResults;
