import React from "react";

const QuestionBox = ({ question, onAnswer, disabled }) => {
  return (
    <div className="question-box">
      <h2>{question.text}</h2>
      {question.image && (
        <img
          src={question.image}
          alt="illustration"
          style={{ maxWidth: "100%", height: "auto", margin: "1rem 0" }}
        />
      )}
      <div className="options">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.isCorrect)}
            disabled={disabled}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionBox;
