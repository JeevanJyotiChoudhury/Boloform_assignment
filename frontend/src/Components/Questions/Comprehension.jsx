import React, { useState } from "react";

const Comprehension = ({ question, onChange }) => {
  const [passage, setPassage] = useState(question ? question.data.passage : "");
  const [questions, setQuestions] = useState(
    question ? question.data.questions : []
  );

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
    onChange({ passage, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex]) {
      if (!updatedQuestions[questionIndex].options) {
        updatedQuestions[questionIndex].options = [];
      }
      updatedQuestions[questionIndex].options[optionIndex] = value;
      setQuestions(updatedQuestions);
      onChange({ passage, questions: updatedQuestions });
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: [], correctAnswer: "" },
    ]);
    onChange({
      passage,
      questions: [
        ...questions,
        { question: "", options: [], correctAnswer: "" },
      ],
    });
  };

  return (
    <div>
      <h3>Comprehension Question</h3>
      <label>Passage:</label>
      <textarea
        value={passage}
        onChange={(e) => setPassage(e.target.value)}
      ></textarea>
      <label>Questions:</label>
      {questions.map((q, questionIndex) => (
        <div key={questionIndex}>
          <label>Question:</label>
          <input
            type="text"
            value={q.question}
            onChange={(e) =>
              handleQuestionChange(questionIndex, "question", e.target.value)
            }
          />
          <label>Options:</label>
          {q.options &&
            q.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(
                      questionIndex,
                      optionIndex,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          <button
            onClick={() =>
              handleOptionChange(questionIndex, q.options.length, "")
            }
          >
            Add Option
          </button>
          <label>Correct Answer:</label>
          <input
            type="text"
            value={q.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(
                questionIndex,
                "correctAnswer",
                e.target.value
              )
            }
          />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
    </div>
  );
};

export default Comprehension;
