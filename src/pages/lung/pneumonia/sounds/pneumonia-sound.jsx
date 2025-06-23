import { useRef, useEffect } from "react";
import { PositionalAudio } from "@react-three/drei";
import * as THREE from "three";

const PneumoniaSound3D = () => {
  const soundRef = useRef();
  const listenerRef = useRef();

  useEffect(() => {
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load("/sounds/pneumonia-sound.mp3", (buffer) => {
      const sound = soundRef.current;

      if (sound && !sound.buffer) {
        sound.setBuffer(buffer);
        sound.setRefDistance(10);
        sound.setLoop(true);
        sound.setVolume(1);

        const playSound = () => {
          if (!sound.isPlaying) {
            sound.play();
          }
          window.removeEventListener("click", playSound);
        };

        window.addEventListener("click", playSound);
      }
    });
  }, []);

  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="crimson" />

      <PositionalAudio ref={soundRef} />
    </mesh>
  );
};

export default PneumoniaSound3D;
