import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DisplayQuestions = () => {
  const [questions, setQuestions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/questions/getAll")
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleOptionSelection = (
    passageIndex,
    questionIndex,
    optionIndex,
    selectedOption
  ) => {
    const updatedQuestions = { ...questions };
    const currentQuestion =
      updatedQuestions.comprehension[passageIndex].questions[questionIndex];

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    currentQuestion.selectedOption = selectedOption;
    currentQuestion.isCorrect = isCorrect;

    setQuestions(updatedQuestions);
  };

  return (
    <>
      <div className="flex justify-end mt-6 mr">
        <button onClick={() => navigate("/")}>Add Questions</button>
      </div>
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">All Questions</h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-blue-600">Categorize</h2>
          {questions?.categorize?.map((elem, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-lg mb-2">{`${index + 1}. ${
                elem?.question
              }`}</p>
              <div className="ml-4 grid grid-cols-2 gap-4">
                {elem?.options?.map((el, i) => (
                  <div key={i} className="bg-gray-300 p-2 rounded-md">
                    {el}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-blue-600">Cloze</h2>
          {questions?.cloze?.map((elem, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-lg mb-2">{`${index + 1}. ${
                elem.question
              }`}</p>
              <div className="ml-4 grid grid-cols-2 gap-4">
                {elem?.blanks?.map((el, i) => (
                  <div key={i} className="bg-gray-300 p-2 rounded-md" draggable>
                    {el}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 text-blue-600">
            Comprehension
          </h2>
          {questions?.comprehension?.map((elem, passageIndex) => (
            <div key={passageIndex} className="mb-4">
              <p className="font-semibold text-lg mb-2">{elem.passage}</p>
              <div className="ml-4">
                {elem?.questions?.map((el, questionIndex) => (
                  <div key={questionIndex} className="mb-4 ml-4">
                    <p className="font-semibold text-base mb-1">{`${
                      questionIndex + 1
                    }. ${el.question}`}</p>
                    <div className="ml-4 grid grid-cols-2 gap-4">
                      {el?.options?.map((e, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded-md cursor-pointer ${
                            el.selectedOption === e
                              ? el.isCorrect
                                ? "bg-green-200"
                                : "bg-red-200"
                              : "bg-gray-300"
                          }`}
                          onClick={() =>
                            handleOptionSelection(
                              passageIndex,
                              questionIndex,
                              optionIndex,
                              e
                            )
                          }
                        >
                          {e}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayQuestions;
