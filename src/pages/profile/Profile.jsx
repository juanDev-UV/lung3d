import { useCallback, useEffect } from "react";
import useAuthStore from "../../stores/use-auth-store";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRightFromBracket,
  faEnvelope,
  faGamepad,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

const Profile = () => {
  const { userLogged, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout().then(() => navigate("/"));
  }, [logout, navigate]);

  useEffect(() => {
    if (!userLogged) return;
    const fetchData = async () => {
      const { displayName, email } = userLogged;
      const data = { displayName, email };
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        return await response.json();
      } catch (error) {
        console.error(`Error creating user:`, error);
      }
    };
    fetchData();
  }, [userLogged]);

  // Sin sesión iniciada
  if (!userLogged) {
    return (
      <section className="profile">
        <Link to="/" className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
        </Link>
        <div className="profile-card profile-card--empty">
          <span className="profile-card__placeholder">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <h2>No has iniciado sesión</h2>
          <p>Inicia sesión para ver tu perfil y guardar tu progreso.</p>
          <Link to="/iniciar-sesion" className="btn-primary">
            Iniciar sesión
          </Link>
        </div>
      </section>
    );
  }

  const initial = (userLogged.displayName || userLogged.email || "U").charAt(0).toUpperCase();

  return (
    <section className="profile">
      <Link to="/" className="back-btn">
        <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
      </Link>

      <div className="profile-card">
        <div className="profile-card__banner" />

        <div className="profile-card__avatar">
          {userLogged.photoURL ? (
            <img
              src={userLogged.photoURL}
              alt={userLogged.displayName || "Avatar"}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span>{initial}</span>
          )}
        </div>

        <h2 className="profile-card__name">{userLogged.displayName || "Usuario"}</h2>
        {userLogged.email && (
          <p className="profile-card__email">
            <FontAwesomeIcon icon={faEnvelope} /> {userLogged.email}
          </p>
        )}

        <div className="profile-card__actions">
          <Link to="/quiz" className="btn-primary">
            <FontAwesomeIcon icon={faGamepad} /> Ir al Quiz
          </Link>
          <button onClick={handleLogout} type="button" className="btn-logout">
            <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
