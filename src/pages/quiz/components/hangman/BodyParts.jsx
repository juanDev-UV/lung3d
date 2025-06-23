/* eslint-disable react/prop-types */
import { Cylinder, Sphere } from "@react-three/drei";

// Componente que dibuja partes del cuerpo según la cantidad de errores
const BodyParts = ({ count = 0, position = [0, 1.2, 0] }) => {
  const [x, y, z] = position;

  const parts = [];

  // Cabeza (1)
  if (count > 0) {
    parts.push(
      <Sphere
        key="head"
        args={[0.15, 32, 32]}
        position={[x, y + 0.5, z]}
        castShadow
      >
        <meshStandardMaterial color="peachpuff" />
      </Sphere>
    );
  }

  // Cuerpo (2)
  if (count > 1) {
    parts.push(
      <Cylinder
        key="body"
        args={[0.07, 0.07, 0.55, 32]}
        position={[x, y + 0.1, z]}
        castShadow
      >
        <meshStandardMaterial color="#fca" />
      </Cylinder>
    );
  }

  // Brazo izquierdo (3)
  if (count > 2) {
    parts.push(
      <Cylinder
        key="left-arm"
        args={[0.05, 0.05, 0.4, 32]}
        rotation={[0, 0, Math.PI / 4]}
        position={[x - 0.22, y + 0.4, z]}
        castShadow
      >
        <meshStandardMaterial color="#fca" />
      </Cylinder>
    );
  }

  // Brazo derecho (4)
  if (count > 3) {
    parts.push(
      <Cylinder
        key="right-arm"
        args={[0.05, 0.05, 0.4, 32]}
        rotation={[0, 0, -Math.PI / 4]}
        position={[x + 0.22, y + 0.4, z]}
        castShadow
      >
        <meshStandardMaterial color="#fca" />
      </Cylinder>
    );
  }

  // Pierna izquierda (5)
  if (count > 4) {
    parts.push(
      <Cylinder
        key="left-leg"
        args={[0.05, 0.05, 0.4, 32]}
        rotation={[0, 0, -Math.PI / 8]}
        position={[x - 0.14, y - 0.3, z]}
        castShadow
      >
        <meshStandardMaterial color="#fca" />
      </Cylinder>
    );
  }

  // Pierna derecha (6)
  if (count > 5) {
    parts.push(
      <Cylinder
        key="right-leg"
        args={[0.05, 0.05, 0.4, 32]}
        rotation={[0, 0, Math.PI / 8]}
        position={[x + 0.14, y + -0.3, z]}
        castShadow
      >
        <meshStandardMaterial color="#fca" />
      </Cylinder>
    );
  }

  return <group>{parts}</group>;
};

export default BodyParts;
