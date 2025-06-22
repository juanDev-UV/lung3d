// src/stores/firestore.js
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { app } from "../../firebase.config"; // Asegúrate que 'app' esté bien exportado

const db = getFirestore(app);

/**
 * Guarda el puntaje del usuario en la colección `quizScores`
 * @param {object} user - Usuario autenticado de Firebase
 * @param {number} score - Puntaje final del quiz
 */
export async function saveScoreToFirestore(user, score) {
  if (!user) return;

  try {
    await addDoc(collection(db, "quizScores"), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      score,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Puntaje guardado en Firestore");
  } catch (error) {
    console.error("❌ Error al guardar el puntaje en Firestore:", error);
  }
}

/**
 * Obtiene los 3 mejores puntajes ordenados de mayor a menor
 * @returns {Promise<Array<{name: string, score: number}>>}
 */
export async function getTopScores() {
  try {
    const q = query(
      collection(db, "quizScores"),
      orderBy("score", "desc"),
      limit(3)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("❌ Error al obtener los top scores:", error);
    return [];
  }
}

// (Opcional) exportar db si lo necesitas en otros módulos
export { db };
