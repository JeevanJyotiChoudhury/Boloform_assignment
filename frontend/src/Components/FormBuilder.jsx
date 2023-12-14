import React, { useState, useEffect } from "react";

import axios from "axios";
import Categorize from "./Questions/Categorize";
import Cloze from "./Questions/Cloze";
import Comprehension from "./Questions/Comprehension";
import { useNavigate } from "react-router-dom";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ type: "", data: {} });
  const navigate=useNavigate()

  const addQuestion = () => {
    axios
      .post("http://localhost:8080/questions/add", newQuestion)
      .then((response) => {
        setQuestions([...questions, response.data]);
        setNewQuestion({ type: "", data: {} });
      })
      .catch((error) => console.error("Error adding question:", error));
  };
  return (
    <>
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Question Type:
          </label>
          <select
            className="border p-2 w-full"
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, type: e.target.value })
            }
            value={newQuestion.type}
          >
            <option value="">Select</option>
            <option value="categorize">Categorize</option>
            <option value="cloze">Cloze</option>
            <option value="comprehension">Comprehension</option>
          </select>
        </div>

        {newQuestion.type === "categorize" && (
          <Categorize
            onChange={(data) => setNewQuestion({ ...newQuestion, data })}
          />
        )}
        {newQuestion.type === "cloze" && (
          <Cloze
            onChange={(data) => setNewQuestion({ ...newQuestion, data })}
          />
        )}
        {newQuestion.type === "comprehension" && (
          <Comprehension
            onChange={(data) => setNewQuestion({ ...newQuestion, data })}
          />
        )}

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={addQuestion}
        >
          Add Question
        </button>
      </div>
      <div className="flex justify-center my-8 rounded-md">
        <button onClick={() => navigate("/display")}>Get Questions</button>
      </div>
    </>
  );
};

export default FormBuilder;
