import { Text } from "@react-three/drei";

const WordDisplay = ({ word, guessed, position }) => {
  return (
    <group position={position}>
      {word.split("").map((char, i) => (
        <Text
          key={i}
          fontSize={0.2}
          position={[i * 0.3 - word.length * 0.15, 0, 0]}
          color={guessed.includes(char) ? "red" : "black"}
        >
          {guessed.includes(char) ? char : "_"}
        </Text>
      ))}
    </group>
  );
};

export default WordDisplay;
