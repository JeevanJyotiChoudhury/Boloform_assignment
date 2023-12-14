import React, { useState } from "react";

const Cloze = ({ question, onChange }) => {
  const [questionText, setQuestionText] = useState(
    question && question.data ? question.data.question : ""
  );
  const [blanks, setBlanks] = useState(question?.data?.blanks || []);

  const handleQuestionChange = (value) => {
    const updatedQuestion = value.replace(
      /\$([^\$]+)\$/g,
      (_, word) => `______`
    );
    setQuestionText(updatedQuestion);
    onChange({ question: updatedQuestion, blanks });
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
        placeholder="add word between $word$ for blank"
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
      <button onClick={addBlank}>Add Options</button>
    </div>
  );
};

export default Cloze;
