import { useCallback } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLungs, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/use-auth-store";

const Login = () => {
  const { loginGoogleWithPopup } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopup()
      .then(() => navigate("/enfermedades"))
      .catch(() => navigate("/"));
  }, [loginGoogleWithPopup, navigate]);

  return (
    <section className="login-container">
      <Link to="/" className="back-btn login-back">
        <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
      </Link>

      <div className="login-panel">
        <div className="login-panel__banner" />
        <div className="login-logo">
          <FontAwesomeIcon icon={faLungs} />
        </div>

        <h2 className="login-title">Iniciar sesión</h2>
        <p className="login-subtitle">
          Accede con tu cuenta para realizar el <strong>quiz interactivo</strong> y guardar tu
          progreso.
        </p>

        <button type="button" className="google-btn" onClick={handleLogin}>
          <img src="/images/icon-google.svg" alt="" className="google-btn__icon" />
          Continuar con Google
        </button>

        <p className="login-note">
          Usamos tu cuenta de Google solo para identificarte. No compartimos tu información.
        </p>
      </div>
    </section>
  );
};

export default Login;
