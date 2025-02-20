import { useCallback } from "react";
import useQuizStore from "../../stores/use-quiz-store";
import "./Quiz.css";

const Quiz = () => {
  const { quiz, incrementQuizProgress } = useQuizStore();

  const handleQuizNext = useCallback(() => {
    incrementQuizProgress();
  }, [incrementQuizProgress]);
  
  return (
    <div className="quiz">
      <h1>Quiz</h1>
      <a className = "content">
          <span className ="span1">
            Progreso del quiz: {quiz.percentageQuizCompleted} % 
          </span>
      </a>
      <button className="btn2" onClick={handleQuizNext}>
          Siguiente
      </button>
    </div>
  );
};

export default Quiz;
