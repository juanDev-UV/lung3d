/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// src/quiz/components/hangman/Alphabet.jsx
import { Text3D } from "@react-three/drei";

const Alphabet = ({ onGuess, guessed, disabled, position = [0, 0, 0] }) => {
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

  // Configuración de distribución
  const lettersPerRow = 9;
  const spacing = 0.3;

  const handleClick = (letter) => {
    if (!guessed.includes(letter) && !disabled) {
      onGuess(letter);
    }
  };

  return (
    <group position={position}>
      {letters.map((letter, index) => {
        const row = Math.floor(index / lettersPerRow);
        const col = index % lettersPerRow;

        const x = (col - lettersPerRow / 2) * spacing + spacing / 2;
        const y = -row * 0.4;

        return (
          <Text3D
            key={letter}
            font="/fonts/Roboto_Regular.json"
            size={0.2}
            height={0.05}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.005}
            bevelSegments={3}
            position={[x, y, 0]}
            onClick={() => handleClick(letter)}
          >
            {letter}
            <meshStandardMaterial
              color={guessed.includes(letter) ? "gray" : "#00b39f"}
              toneMapped={false}
            />
          </Text3D>
        );
      })}
    </group>
  );
};

export default Alphabet;
