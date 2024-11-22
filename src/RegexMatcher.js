import React, { useState } from "react";

function escapeRegExp(s) {
  return s.replaceAll("\\\\", "\\");
}

const RegexLineMatcher = () => {
  const [regex, setRegex] = useState("");
  const [content, setContent] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleCheck = () => {
    // Reset previous state
    setError(null);
    setResults([]);

    // Validate input
    if (!regex || !content) {
      setError("Please enter both a regex pattern and content");
      return;
    }

    try {
      // Create regex object
      console.log(regex);
      const regexObj = new RegExp(escapeRegExp(regex));
      console.log(regexObj.source);
      // Split content and filter out empty lines
      const lines = content.split("\n").filter((line) => line.trim() !== "");

      // Check each line and create results
      const matchedResults = lines.map((line, index) => ({
        text: line,
        matches: regexObj.test(line),
        id: index,
      }));

      setResults(matchedResults);
    } catch (regexError) {
      setError(`Invalid Regex: ${regexError.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Regex Line Matcher</h1>

        <div className="space-y-4">
          {/* Regex Input */}
          <div>
            <label
              htmlFor="regex-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Regular Expression
            </label>
            <input
              type="text"
              id="regex-input"
              placeholder="Enter regex pattern (e.g., ^hello, \d+)"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label
              htmlFor="content-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content (one line per entry)
            </label>
            <textarea
              id="content-input"
              placeholder="Enter your text here, one line per entry"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Check Button */}
          <button
            onClick={handleCheck}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Check Lines
          </button>

          {/* Error Display */}
          {error && (
            <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Results Display */}
          {results.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Results:</h3>
              <div className="space-y-2">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`p-2 rounded ${
                      result.matches
                        ? "bg-green-100 border-green-200"
                        : "bg-white border-gray-200"
                    } border`}
                  >
                    {result.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegexLineMatcher;
