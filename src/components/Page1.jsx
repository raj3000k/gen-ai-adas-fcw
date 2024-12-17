import React, { useState } from "react";
import { fetchGeneratedCode } from "../services/geminiService";
import TestCases from "./TestCases";
import ClipLoader from "react-spinners/ClipLoader";

function Page1() {
  const [requirement, setRequirement] = useState("");
  const [error, setError] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [runLoading,setRunLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
    setGeneratedCode("loading")
      const code = await fetchGeneratedCode(requirement);
      setGeneratedCode(code);
    } catch (error) {
      console.error("Error in fetching code:", error);
      setError("Failed to generate code. Please try again.");
    }
  };
  return (
    <div className="flex flex-col h-screen w-full space-y-3 py-4">
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="Enter your requirement here..."
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit Requirement
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full space-y-3">
        <div className="w-full flex justify-center items-center">
          <ClipLoader color={"#000000"} loading={generatedCode==="loading"?true:false} size={30} />
        </div>
        <h3 className="text-xl font-semibold mb-4">Generated Code</h3>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm max-w-full overflow-x-auto h-full">
          <textarea className="w-full h-screen" value={generatedCode}>
            {generatedCode || "// Generated code will appear here..."}
          </textarea>
        </div>
      </div>
      {generatedCode && (
        <div className="space-y-3">
          <TestCases />
        </div>
      )}
    </div>
  );
}

export default Page1;
