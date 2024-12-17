import React, { useState,useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function TestCases() {
  const testCases = [
    {
      name: "Case 1",
      speed: 50,
      distance: 200,
    },
    {
      name: "Case 2",
      speed: 80,
      distance: 400,
    },
  ];

  const [currentCase, setCase] = useState(1);
  const [updatedTestCases, setUpdatedTestCases] = useState(testCases);
  const [testCaseLoading, setTestCaseLoading] = useState(false);
  const [processedCases, setProcessedCases] = useState();
  const [testCasesRun, setTestCaseRun] = useState(false);

  const addTestCase = () => {
    const curLength = updatedTestCases.length;

    // Create a new array with the existing test cases and the new test case
    const newTestCases = [
      ...updatedTestCases,
      { name: `Case ${curLength + 1}`, speed: 10, distance: 20 },
    ];

    // Update the state with the new array
    setUpdatedTestCases(newTestCases);
    console.log(updatedTestCases);
  };
  const deleteTestCase = (index) => {
    const newTestCases = updatedTestCases.filter((_, i) => i !== index);
    setUpdatedTestCases(newTestCases);

    // Adjust the currentCase index
    if (newTestCases.length === 0) {
      setCase(1); // Reset to 1 if no test cases remain
    } else if (currentCase > newTestCases.length) {
      setCase(newTestCases.length); // Point to the last case if currentCase exceeds bounds
    }
  };
  const handleInputChange = (index, field, value) => {
    const newTestCases = [...updatedTestCases];
    newTestCases[index][field] = value;
    setUpdatedTestCases(newTestCases);

    console.log(updatedTestCases);
  };

  const runTestCases = () => {

    setTestCaseLoading(true);
    const newTestCases = updatedTestCases.map((testCase, index) => ({
      ...testCase, // Copy existing properties
      passed: index % 2 === 0, // Add the new 'passed' parameter with a default value
    }));
    setProcessedCases(newTestCases);
    setTimeout(() => {
      setTestCaseLoading(false);
      setTestCaseRun(true)
      console.log(processedCases);
    }, 2000);
  };
  // useEffect(() => {
  //   if (!testCaseLoading) {
  //     console.log(processedCases); // Log when processedCases is updated
  //   }
  // }, [processedCases, testCaseLoading]);
  return (
    <div className="w-full h-full flex flex-col px-4 py-4 border-2 border-gray-400 rounded-lg space-y-3">
      <button
        className="bg-blue-500 rounded-lg py-4 flex text-white w-[10vw] h-[2vw] justify-center items-center"
        onClick={() => {
          runTestCases();
        }}
      >
        Run Test Cases
      </button>
      {testCaseLoading && (
        <div className="w-full h-auto flex items-center justify-center">
          <ClipLoader color={"#000000"} loading={testCaseLoading} size={30} />
        </div>
      )}
      {testCasesRun ? (
        <>
        <div className="flex flex-row w-full space-x-3 items-center">
          {processedCases.map((item, index) => {
            return (
              <div
                className={` ${
                  currentCase === index + 1
                    ? "bg-gray-500 text-white"
                    : "text-black"
                }  py-1 px-2 rounded-md hover:bg-gray-700 flex flex-row justify-center items-center w-auto space-x-4 hover:text-white cursor-pointer relative`}
                onClick={() => {
                  setCase(index + 1);
                }}
              >
                
            <div className={`h-1 w-1 ${item.passed ? 'bg-green-500':'bg-red-500'} rounded-full mr-2`}></div>
                {item.name}
              </div>
            );
          })}
          
        </div>
        <div className="flex flex-col w-full mt-5 space-y-2">
          <label className="text-black">Car Speed (Km/h)</label>
          <input
            className="bg-gray-200 text-black border-2 border-blue-500 py-2 px-4 rounded-lg"
            value={updatedTestCases[currentCase - 1]?.speed || ""}
            type="number"
            disabled={true}
            onChange={(e) => {
              handleInputChange(
                currentCase - 1,
                "speed",
                Number(e.target.value)
              );
            }}
          ></input>
          <label className="text-black">Object Distance (Metres)</label>
          <input
            className="bg-gray-200 text-black border-2 border-blue-500 py-2 px-4 rounded-lg"
            value={updatedTestCases[currentCase - 1]?.distance || ""}
            type="number"
            disabled={true}
            onChange={(e) => {
              handleInputChange(
                currentCase - 1,
                "distance",
                Number(e.target.value)
              );
            }}
          ></input>
        </div>
      </>
      ) : (
        <>
          <div className="flex flex-row w-full space-x-3 items-center">
            {updatedTestCases.map((item, index) => {
              return (
                <div
                  className={` ${
                    currentCase === index + 1
                      ? "bg-gray-500 text-white"
                      : "text-black"
                  }  py-1 px-2 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer relative`}
                  onClick={() => {
                    setCase(index + 1);
                  }}
                >
                  {currentCase > 2 && currentCase === index + 1 && (
                    <div
                      className="absolute -right-2 hover:bg-red-500 -top-2 bg-gray-600 flex items-center h-4 w-4 justify-center rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTestCase(index);
                      }}
                    >
                      <h1 className="text-[12px] text-center">x</h1>
                    </div>
                  )}

                  {item.name}
                </div>
              );
            })}
            <div
              className="bg-gray-500 text-white py-1 px-1 rounded-md hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                addTestCase();
              }}
            >
              +
            </div>
          </div>
          <div className="flex flex-col w-full mt-5 space-y-2">
            <label className="text-black">Car Speed (Km/h)</label>
            <input
              className="bg-gray-200 text-black border-2 border-blue-500 py-2 px-4 rounded-lg"
              value={updatedTestCases[currentCase - 1]?.speed || ""}
              type="number"
              onChange={(e) => {
                handleInputChange(
                  currentCase - 1,
                  "speed",
                  Number(e.target.value)
                );
              }}
            ></input>
            <label className="text-black">Object Distance (Metres)</label>
            <input
              className="bg-gray-200 text-black border-2 border-blue-500 py-2 px-4 rounded-lg"
              value={updatedTestCases[currentCase - 1]?.distance || ""}
              type="number"
              onChange={(e) => {
                handleInputChange(
                  currentCase - 1,
                  "distance",
                  Number(e.target.value)
                );
              }}
            ></input>
          </div>
        </>
      )}
    </div>
  );
}
