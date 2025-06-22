// controls/KeyboardControls.js
import { KeyboardControls } from "@react-three/drei";

export const KeyboardControlsWrapper = ({ children }) => {
  const keyboardMap = [
    { name: "pause", keys: ["Space", "KeyP"] }, // Espacio o P para pausar/reanudar
  ];

  return <KeyboardControls map={keyboardMap}>{children}</KeyboardControls>;
};
