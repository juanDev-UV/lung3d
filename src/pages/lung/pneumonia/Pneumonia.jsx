import "./Pneumonia.css";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Sky,
  Text,
  KeyboardControls,
  useKeyboardControls,
} from "@react-three/drei";

// Modelos 3D
import PnumoniaModel1 from "./models-3d/LungPneumonia";
import PneumoniaModel from "./models-3d/LungLungPneumonia";
import PnumoniaModel2 from "./models-3d/LungLungLungPneumonia";
import PneumoniaModel3 from "./models-3d/LungLungLungLungPneumonia";

// Entorno y luces
import Lights from "./lights/Lights";
import Floor from "./models-3d/Floor";
import StagingPneumonia from "./staging/stagingPneumonia";
import StagingNightPneumonia from "./staging/stagingNightPneumonia";
import StagingNight2Pneumonia from "./staging/stagingNight2Pneumonia";

// Fuente para Text3D
import Text3DMuli from "./fonts/Text3DMuli";
import Text3DComfortaa from "./fonts/Text3DComforta";


const useHoverSoundEffect = (relativePath, cooldown = 3000) => {
  const audioRef = useRef(null);
  const [lastPlayed, setLastPlayed] = useState(0);

  useEffect(() => {
    const absoluteUrl = import.meta.env.BASE_URL + relativePath;
    const audio = new Audio(absoluteUrl);
    audio.volume = 1;
    audio.preload = "auto";

    audio.addEventListener("canplaythrough", () => {
      console.log("✅ Audio listo:", absoluteUrl);
    });

    audio.addEventListener("error", (e) => {
      console.warn("❌ Error cargando el audio:", e);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [relativePath]);

  const playSound = () => {
    const now = Date.now();
    if (audioRef.current && now - lastPlayed > cooldown) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn("⚠️ No se pudo reproducir el audio:", err);
      });
      setLastPlayed(now);
    }
  };

  return { playSound, audioRef };
};


// ✅ InteractiveSoundModel ahora puede usar el hook sin errores de referencia
const InteractiveSoundModel = ({ ModelComponent, scale = 15, soundUrl, cooldown = 3000 }) => {
  const groupRef = useRef();
  const [isRotating, setIsRotating] = useState(false);
  const initialPosition = [0, 0, 0];
  const { playSound, audioRef } = useHoverSoundEffect(soundUrl, cooldown); // ✔️ ya disponible

  const [_, getKeys] = useKeyboardControls();

  useFrame(() => {
    const keys = getKeys();
    if (groupRef.current) {
      if (keys.rotate) {
        groupRef.current.rotation.y += 0.03;
        setIsRotating(true);
      } else if (keys.invert) {
        groupRef.current.rotation.y -= 0.03;
        setIsRotating(true);
      } else if (keys.stop) {
        setIsRotating(false);
      } else {
        groupRef.current.rotation.y += 0.005;
        setIsRotating(false);
      }
    }
  });

  const handleReset = () => {
    if (groupRef.current) {
      groupRef.current.position.set(...initialPosition);
      groupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <>
      <group
        ref={groupRef}
        position={initialPosition}
        onPointerOver={playSound}
        onClick={playSound}
      >
        <ModelComponent scale={scale} />
        <Html position={[0, -2, 0]}>
          <button
            onClick={handleReset}
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              fontSize: "1rem",
              cursor: "pointer",
              width: "150px",
              height: "50px",
            }}
          >
            Reiniciar
          </button>
        </Html>
        {isRotating && (
          <Html position={[0, 0, 0]} style={{ zIndex: 20 }}>
            <div
              style={{
                background: "rgba(0, 0, 0, 0.7)",
                padding: "10px 20px",
                borderRadius: "8px",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Rotando...
            </div>
          </Html>
        )}
      </group>

      {/* ✅ audioRef usado directamente en el DOM */}
      <Html position={[0, -3, 0]}>
        <audio ref={audioRef} src={soundUrl} preload="auto" />
      </Html>
    </>
  );
};



const textFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const RotatingModel = ({ scale, position = [0, 0, 0], ModelComponent }) => {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <ModelComponent scale={scale} />
    </group>
  );
};

const InteractiveModel = ({ ModelComponent, scale = 15 }) => {
  const groupRef = useRef();
  const [isRotating, setIsRotating] = useState(false);
  const initialPosition = [0, 0, 0];

  const [_, getKeys] = useKeyboardControls();

  useFrame(() => {
    const keys = getKeys();
    if (groupRef.current) {
      if (keys.rotate) {
        groupRef.current.rotation.y += 0.03;
        setIsRotating(true);
      } else if (keys.invert) {
        groupRef.current.rotation.y -= 0.03;
        setIsRotating(true);
      } else if (keys.stop) {
        setIsRotating(false);
      } else {
        groupRef.current.rotation.y += 0.005;
        setIsRotating(false);
      }
    }
  });

  const handleReset = () => {
    if (groupRef.current) {
      groupRef.current.position.set(...initialPosition);
      groupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <group ref={groupRef} position={initialPosition}>
      <ModelComponent scale={scale} />
      <Html position={[0, -2, 0]}>
        <button
          onClick={handleReset}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            width: "150px",
            height: "50px",
          }}
        >
          Reiniciar
        </button>
      </Html>
      {isRotating && (
        <Html position={[0, 0, 0]} style={{ zIndex: 20 }}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              padding: "10px 20px",
              borderRadius: "8px",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Rotando...
          </div>
        </Html>
      )}
    </group>
  );
};

// --- NUEVO COMPONENTE: Texto 3D que se sacude ---
const ShakingText = (props) => {
  const textRef = useRef();
  const shakeIntensity = 0.03;
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (textRef.current) {
      if (hovered) {
        const time = performance.now() * 0.005;
        textRef.current.position.x = Math.sin(time * 4) * shakeIntensity;
        textRef.current.position.y = props.position[1] + Math.cos(time * 3) * shakeIntensity;
        textRef.current.position.z = props.position[2];
      } else {
        textRef.current.position.x = props.position[0];
        textRef.current.position.y = props.position[1];
        textRef.current.position.z = props.position[2];
      }
    }
  });

  return (
    <Text
      ref={textRef}
      fontSize={props.fontSize || 0.5}
      color={props.color || "white"}
      anchorX="center"
      anchorY="middle"
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {props.children}
    </Text>
  );
};

const Pneumonia = () => {
  return (
    <div className="pneumonia-container">
      <section className="section section-intro">
        <div className="section-content row-reverse">
          <motion.div
            className="text-content"
            variants={textFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="title title-intro">Neumonía</h2>
            <p className="text text-intro">
              La neumonía es una infección pulmonar que causa inflamación en los sacos
              de aire, llenándolos de líquido o pus. Afecta la respiración, produce
              fiebre, tos y fatiga, y puede ser potencialmente grave sin el tratamiento
              adecuado. Es causada por bacterias, virus o incluso hongos, y afecta
              especialmente a personas con sistemas inmunitarios debilitados.
            </p>
          </motion.div>
          <div className="model model-pneumonia">
            <KeyboardControls map={[
              { name: "rotate", keys: ["r"] },
              { name: "invert", keys: ["i"] },
              { name: "stop", keys: ["s"] }
            ]}>
              <Canvas camera={{ position: [0, 0, 3.5] }} shadows>
                <OrbitControls />
                <Lights type="A" />
                <StagingNight2Pneumonia />
                <InteractiveModel scale={15} ModelComponent={PneumoniaModel} />

                <Html position={[2, 1, 0]}>
                  <div className="controls-label">
                    <strong>Controles:</strong>
                    <span>R: Rotar</span>
                    <span>I: Invertir</span>
                    <span>S: Detener</span>
                  </div>
                </Html>

                <Floor />
                <Text3DComfortaa
                  title="Neumonía"
                  position={[-1, 2, 0]}
                  size={0.3}
                  color="#b8a9e6"
                />
                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -2, 0]}
                >
                  <planeGeometry args={[20, 20]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>
        <div className="arrow arrow-intro">▼</div>
      </section>

      <section className="section section-symptoms">
        <div className="section-content row-normal">
          <motion.div
            className="text-content"
            variants={textFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="title title-symptoms">Síntomas</h3>
            <p className="text text-symptoms">
              La neumonía presenta síntomas como fiebre alta, escalofríos, tos con
              flema, dificultad para respirar y dolor en el pecho al respirar o toser.
              Otros signos pueden incluir sudoración excesiva, fatiga, pérdida de
              apetito y confusión (especialmente en adultos mayores).
              <br />
              <br />
              <strong>Síntomas comunes:</strong>
              <br />• Fiebre y escalofríos
              <br />• Tos con flema
              <br />• Dificultad para respirar
              <br />• Dolor en el pecho
              <br />• Fatiga y debilidad
              <br />• Confusión mental
            </p>
          </motion.div>
          <div className="model model-pneumonia-symptoms">
            <KeyboardControls map={[
              { name: "rotate", keys: ["r"] },
              { name: "invert", keys: ["i"] },
              { name: "stop", keys: ["s"] }
            ]}>
              <Canvas camera={{ position: [1, 0, 3] }} shadows>
                <OrbitControls />
                <Sky sunPosition={[100, 20, 100]} />
                <Lights type="B" />
                <InteractiveSoundModel
                  ModelComponent={PnumoniaModel1}
                  scale={15}
                  soundUrl="/sounds/pneumonia-sound.mp3"
                  cooldown={4000}
                />


                <Html position={[2, 1, 0]}>
                  <div className="controls-label">
                    <strong>Controles:</strong>
                    <span>R: Rotar</span>
                    <span>I: Invertir</span>
                    <span>S: Detener</span>
                  </div>
                </Html>

                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -3, 0]}
                >
                  <planeGeometry args={[20, 20]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>
        <div className="arrow arrow-symptoms">▼</div>
      </section>

      <section className="section section-treatment">
        <div className="section-content row-reverse">
          <motion.div
            className="text-content"
            variants={textFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="title title-treatment">Tratamientos</h3>
            <p className="text text-treatment">
              El tratamiento de la neumonía depende de la causa y la gravedad del caso.
              <br />
              <br />
              <strong>Tratamientos médicos convencionales:</strong>
              <br />• Antibióticos (en casos bacterianos)
              <br />• Antivirales o antimicóticos según el origen
              <br />• Oxigenoterapia para facilitar la respiración
              <br />• Hospitalización en casos graves
              <br />• Analgésicos y antipiréticos para el malestar
              <br />
              <br />
              <strong>Tratamientos alternativos y complementarios:</strong>
              <br />• Reposo y buena hidratación
              <br />• Inhalaciones de vapor con eucalipto o menta
              <br />• Infusiones de jengibre, miel y limón
              <br />• Alimentos ricos en vitamina C para fortalecer defensas
              <br />• Técnicas de respiración consciente para aliviar la fatiga
            </p>
          </motion.div>

          <div className="model model-treatment">
            <KeyboardControls map={[
              { name: "rotate", keys: ["r"] },
              { name: "invert", keys: ["i"] },
              { name: "stop", keys: ["s"] }
            ]}>
              <Canvas camera={{ position: [1, 0, 4.5] }} shadows>
                <color attach="background" args={["#0a0a1f"]} />
                <fog attach="fog" args={["#0a0a1f", 10, 30]} />
                <OrbitControls />
                <Lights type="C" />
                <StagingNightPneumonia />
                <InteractiveModel ModelComponent={PnumoniaModel2} scale={10} />

                <Html position={[2, 1, 0]}>
                  <div className="controls-label">
                    <strong>Controles:</strong>
                    <span>R: Rotar</span>
                    <span>I: Invertir</span>
                    <span>S: Detener</span>
                  </div>
                </Html>

                <Floor />
                <ShakingText position={[0, 3, 0]} fontSize={0.5} color="white">
                  Tratamientos para la Neumonía
                </ShakingText>
                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -2, 0]}
                >
                  <planeGeometry args={[20, 20]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>
      </section>

      <section className="section section-prevention">
        <div className="section-content row-normal">
          <motion.div
            className="text-content"
            variants={textFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="title title-prevention">Prevención</h3>
            <p className="text text-prevention">
              La mejor manera de prevenir la neumonía es fortaleciendo el sistema inmunológico
              y adoptando hábitos de vida saludables.
              <br />
              <br />
              <strong>Recomendaciones clave:</strong>
              <br />• Alimentación saludable con frutas, verduras y vitamina C.
              <br />• Actividad física moderada y regular.
              <br />• Dormir bien y reducir el estrés.
              <br />• Evitar tabaco y ambientes contaminados.
              <br />• Lavado frecuente de manos y buena higiene al toser.
              <br />• Vacunarse contra gripe y neumococo.
              <br />• Seguir controles médicos si hay enfermedades respiratorias.
            </p>
          </motion.div>

          <div className="model model-prevention">
            <KeyboardControls map={[
              { name: "rotate", keys: ["r"] },
              { name: "invert", keys: ["i"] },
              { name: "stop", keys: ["s"] }
            ]}>
              <Canvas camera={{ position: [0, 0, 4] }} shadows>
                <color attach="background" args={["#1c1f2a"]} />
                <fog attach="fog" args={["#1c1f2a", 10, 30]} />
                <OrbitControls />
                <Lights type="D" />
                <StagingPneumonia />
                <InteractiveModel ModelComponent={PneumoniaModel3} scale={25} />

                <Html position={[2, 1, 0]}>
                  <div className="controls-label">
                    <strong>Controles:</strong>
                    <span>R: Rotar</span>
                    <span>I: Invertir</span>
                    <span>S: Detener</span>
                  </div>
                </Html>
                
                <Floor />

                <Text3DMuli title="Prevención" position={[-1.5, 1.5, 0]} />

                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -2, 0]}
                >
                  <planeGeometry args={[20, 20]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
              </Canvas>
            </KeyboardControls>
          </div>
        </div>
        <div className="arrow arrow-prevention">▼</div>
      </section>    
    </div>
  );
};

export default Pneumonia;
