import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "../quiz/lights/Lights";
import Staging from "../quiz/staging/Staging";
import WordDisplay from "../quiz/components/hangman/WordDisplay";
import Alphabet from "../quiz/components/hangman/Alphabet";
import BodyParts from "../quiz/components/hangman/BodyParts";
import Gallows from "../quiz/components/hangman/Gallows";
import Tree from "./models-3d/Tree";
import Grass from "./models-3d/Grass";
import MedalScene from "../quiz/MedalScene";
import { useState, useEffect } from "react";
import "./quiz.css";
import useAuthStore from "../../stores/use-auth-store";
import { saveScoreToFirestore } from "../../stores/firestore";

const Hangman = () => {
  const questions = [
    {
      disease: "fibrosis",
      question: "¿Qué tejido afecta principalmente la fibrosis pulmonar?",
      answer: "PULMON",
    },
    {
      disease: "asma",
      question:
        "¿Qué enfermedad se caracteriza por dificultad para respirar y silbidos?",
      answer: "ASMA",
    },
    {
      disease: "bronquitis",
      question: "¿Qué produce la bronquitis en exceso en los pulmones?",
      answer: "MOCO",
    },
    {
      disease: "neumonia",
      question: "¿Qué zona de los pulmones se llena de líquido en la neumonía?",
      answer: "ALVEOLOS",
    },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [showMedal, setShowMedal] = useState(false);
  const [score, setScore] = useState(0);

  const { userLooged } = useAuthStore();
  const currentQuestion = questions[questionIndex];
  const currentWord = currentQuestion.answer;

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters((prev) => [...prev, letter]);
    if (!currentWord.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const isWinner = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));
  const isLoser = wrongGuesses >= 6;

  // Manejo de paso entre preguntas
  useEffect(() => {
    if (isWinner || isLoser) {
      const nextStep = () => {
        setCompletedCount((prev) => prev + 1);
        if (isWinner) setScore((prev) => prev + 1);

        if (questionIndex < questions.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          setGuessedLetters([]);
          setWrongGuesses(0);
        } else {
          setShowMedal(true); // Ahora se muestra el medallero
        }
      };

      const timeout = setTimeout(nextStep, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isWinner, isLoser]);

  // Guardar puntaje SOLO al final del quiz
  useEffect(() => {
    if (showMedal && userLooged) {
      saveScoreToFirestore(userLooged, score);
    }
  }, [showMedal, userLooged, score]);

  return (
    <div className="canvas-wrapper">
      <Canvas shadows camera={{ position: [0, -1, 5] }}>
        <OrbitControls />
        <Physics>
          <Lights />
          <Staging />
          <Tree position-z={-2} />
          <Grass />
          <Gallows />
          {!showMedal && (
            <>
              <BodyParts count={wrongGuesses} position={[1, 1, 0]} />
              <WordDisplay
                word={currentWord}
                guessed={guessedLetters}
                position={[-1.5, 1.5, 0]}
              />
              <Alphabet
                onGuess={handleGuess}
                guessed={guessedLetters}
                disabled={isWinner || isLoser}
                position={[-2, 1, 0]}
              />
            </>
          )}
        </Physics>

        {showMedal ? (
          <MedalScene score={score} />
        ) : (
          <Html position={[0, 2.6, 0]}>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${(completedCount / questions.length) * 100}%`,
                }}
              />
            </div>
            <div className="question-text">{currentQuestion.question}</div>
          </Html>
        )}
      </Canvas>
    </div>
  );
};

export default Hangman;
