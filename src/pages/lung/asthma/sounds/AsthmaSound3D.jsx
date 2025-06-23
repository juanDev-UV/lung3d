// AsthmaSound3D.jsx
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const AsthmaSound3D = () => {
  const [positionalAudio, setPositionalAudio] = useState(null);
  const audioRef = useRef();

  useEffect(() => {
    const listener = new THREE.AudioListener();
    const sound = new THREE.PositionalAudio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(
      "/sounds/asthma-sound.mp3",
      (buffer) => {
        sound.setBuffer(buffer);
        sound.setRefDistance(10);
        sound.setLoop(true);
        sound.setVolume(1);

        const play = () => {
          if (!sound.isPlaying) {
            sound.play();
          }
          window.removeEventListener("click", play);
        };

        window.addEventListener("click", play);
        setPositionalAudio(sound); // <- Montamos cuando está listo
      },
      undefined,
      (err) => {
        console.error("❌ Error al cargar audio:", err);
      }
    );
  }, []);

  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="crimson" />

      {/* Solo se renderiza si ya se cargó el audio */}
      {positionalAudio && <primitive object={positionalAudio} />}
    </mesh>
  );
};

export default AsthmaSound3D;

