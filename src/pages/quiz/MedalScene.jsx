import { Text, Html } from "@react-three/drei";
import useAuthStore from "../../stores/use-auth-store";
import { useEffect, useState } from "react";
import { getTopScores } from "../../stores/firestore";

const MedalScene = ({ score }) => {
  const user = useAuthStore((state) => state.userLooged);
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const top = await getTopScores(3);
      setTopScores(top);
    };
    fetchScores();
  }, []);

  return (
    <>
      {/* Título en 3D */}
      <Text
        position={[0, 2.3, 0]}
        fontSize={0.35}
        color="#00b39f"
        anchorX="center"
        anchorY="middle"
      >
        ¡Felicidades!
      </Text>

      {/* Resultado en HTML flotante */}
      <Html center position={[0, 0.5, 0]}>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            padding: "2rem",
            borderRadius: "1rem",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
            width: "350px",
          }}
        >
          <h2 style={{ color: "#00b39f", marginBottom: "1rem" }}>
            Resultado Final
          </h2>

          <p style={{ fontWeight: "bold" }}>
            Nombre:{" "}
            <span style={{ color: "#333" }}>
              {user?.displayName || "Invitado"}
            </span>
          </p>

          <p style={{ fontWeight: "bold" }}>
            Puntaje:{" "}
            <span style={{ color: "#ffd700", fontSize: "1.3rem" }}>
              {score}
            </span>
          </p>

          <hr style={{ margin: "1rem 0" }} />

          <h3 style={{ color: "#00b39f" }}>🏆 Top 3 Puntajes</h3>
          <ol style={{ textAlign: "left", paddingLeft: "1.2rem" }}>
            {topScores.length > 0 ? (
              topScores.map((item, index) => (
                <li key={index} style={{ margin: "0.3rem 0" }}>
                  <strong>{item.name}</strong> - {item.score} pts
                </li>
              ))
            ) : (
              <p>Cargando...</p>
            )}
          </ol>
        </div>
      </Html>
    </>
  );
};

export default MedalScene;
