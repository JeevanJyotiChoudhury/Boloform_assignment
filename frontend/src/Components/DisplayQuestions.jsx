import React, { useEffect, useState } from "react";
import axios from "axios";
import Categorize from "./Questions/Categorize";
import Cloze from "./Questions/Cloze";
import Comprehension from "./Questions/Comprehension";

const DisplayQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions for the specific form using formId from the URL parameter
    axios
      .get(`http://localhost:8080/questions/getAll`)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      <div>
        {questions?.map((question) => {
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
      </div>
    </div>
  );
};

export default DisplayQuestions;
