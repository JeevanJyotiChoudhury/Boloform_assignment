import React, { useState } from "react";

const Cloze = ({ question, onChange }) => {
  const [questionText, setQuestionText] = useState(
    question && question.data ? question.data.question : ""
  );
  const [blanks, setBlanks] = useState(question?.data?.blanks || []);

  const handleQuestionChange = (value) => {
    setQuestionText(value);
    onChange({ question: value, blanks: blanks }); // Include blanks in the onChange for the question
  };

  const handleBlankChange = (index, value) => {
    const updatedBlanks = [...blanks];
    updatedBlanks[index] = value;
    setBlanks(updatedBlanks);
    onChange({ question: questionText, blanks: updatedBlanks });
  };

  const addBlank = () => {
    setBlanks([...blanks, ""]);
    onChange({ question: questionText, blanks: [...blanks, ""] });
  };

  return (
    <div>
      <h3>Cloze Question</h3>
      <label>Question:</label>
      <input
        type="text"
        value={questionText}
        onChange={(e) => handleQuestionChange(e.target.value)}
      />
      <label>Blanks:</label>
      {blanks.map((blank, index) => (
        <div key={index}>
          <input
            type="text"
            value={blank || ""}
            onChange={(e) => handleBlankChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={addBlank}>Add Blank</button>
    </div>
  );
};

export default Cloze;
