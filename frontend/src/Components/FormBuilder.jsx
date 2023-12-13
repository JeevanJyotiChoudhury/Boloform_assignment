import React, { useState, useEffect } from "react";

import axios from "axios";
import Categorize from "./Questions/Categorize";
import Cloze from "./Questions/Cloze";
import Comprehension from "./Questions/Comprehension";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ type: "", data: {} });

//   useEffect(() => {
//     // Fetch all questions on component mount
//     axios
//       .get("http://localhost:5000/api/questions/getAll")
//       .then((response) => setQuestions(response.data))
//       .catch((error) => console.error("Error fetching questions:", error));
//   }, []);

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
    <div>
      <h1>Form Builder</h1>
      <div>
        <label>Select Question Type:</label>
        <select
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
        <Cloze onChange={(data) => setNewQuestion({ ...newQuestion, data })} />
      )}
      {newQuestion.type === "comprehension" && (
        <Comprehension
          onChange={(data) => setNewQuestion({ ...newQuestion, data })}
        />
      )}

      <button onClick={addQuestion}>Add Question</button>

      {/* <div>
        {questions.map((question) => {
          switch (question.type) {
            case "categorize":
              return <Categorize key={question._id} question={question} />;
            case "cloze":
              return <Cloze key={question._id} question={question} />;
            case "comprehension":
              return <Comprehension key={question._id} question={question} />;
            default:
              return null;
          }
        })}
      </div> */}
    </div>
  );
};

export default FormBuilder;
