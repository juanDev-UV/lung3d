import { create } from "zustand";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
  userLogged: null,

  loginGoogleWithPopup: async () => {
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ userLogged: null });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
}));

/**
 * Inicia el observador de sesión de Firebase. Se llama UNA vez al arrancar
 * la app (en main.jsx), no como efecto secundario al importar el módulo.
 */
let started = false;
export function initAuthObserver() {
  if (started) return;
  started = true;
  onAuthStateChanged(auth, (user) => {
    useAuthStore.setState({ userLogged: user ?? null });
  });
}

export default useAuthStore;
