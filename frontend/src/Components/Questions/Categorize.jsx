import { useState } from "react";

const Categorize = ({ question, onChange }) => {
  const [options, setOptions] = useState(question ? question.data.options : []);
  const [questionText, setQuestionText] = useState(
    question ? question.data.question : ""
  );

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    onChange({ question: questionText, options: newOptions });

  };

  const handleQuestionChange = (value) => {
    setQuestionText(value);
    onChange({ question: value });
  };

  return (
    <div>
      <h3>Categorize Question</h3>
      <label>Question:</label>
      <input
        type="text"
        value={questionText}
        onChange={(e) => handleQuestionChange(e.target.value)}
      />
      <label>Options:</label>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => setOptions([...options, ""])}>Add Option</button>
    </div>
  );
};

export default Categorize;
