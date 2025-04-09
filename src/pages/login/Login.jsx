import { useCallback, useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLungs } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from '../../stores/use-auth-store';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {loginGoogleWithPopUp} = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp()
      .then(() => navigate("/enfermedades"))
      .catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log('Enviando datos:', { username, password });
  
  };

        <div className="logo">
          <FontAwesomeIcon icon={faLungs} /> Respira3D.
        </div>

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="logo">
          <FontAwesomeIcon icon={faLungs} /> Respira3D
        </div>
        <h2 style={{fontSize: 25}}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className= "inputs">
          <div className="input-group">
            <label htmlFor="username" style={{fontSize: 15, color: "var(--black)"}}>Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
          </div>
          <div className="input-group">
            <label htmlFor="password" style={{fontSize: 15, color: "var(--black)"}}>Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
            </div>
          </div>
          <div className= "container-login-button">
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
          <br/>
          <label style={{fontSize: 15}}>- O -</label>
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