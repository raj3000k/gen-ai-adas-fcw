import React, { useState } from "react";
import { fetchGeneratedCode } from "../services/geminiService";

const RequirementInput = ({ setGeneratedCode }) => {
  const [requirement, setRequirement] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const code = await fetchGeneratedCode(requirement);
      setGeneratedCode(code);
    } catch (error) {
      console.error("Error in fetching code:", error);
      setError("Failed to generate code. Please try again.");
    }
  };

  return (
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
  );
};

export default RequirementInput;
