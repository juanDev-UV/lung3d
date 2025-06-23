import { useCallback} from 'react';
import './Login.css';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLungs } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from '../../stores/use-auth-store';

const Login = () => {
  const {loginGoogleWithPopUp} = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp()
      .then(() => navigate("/enfermedades"))
      .catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="logo">
          <FontAwesomeIcon icon={faLungs} /> Respira3D
        </div>
        <h2 style={{fontSize: 25}}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className= "container-login-button">
          <a className= "login-button-google" 
              type = "button" 
              onClick={handleLogin}>
            Google<img src = "/images/icon-google.svg"/>
          </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;