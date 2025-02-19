import { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log('Enviando datos:', { username, password });
  };

        <div className="logo">
          <FontAwesomeIcon icon={faHeartbeat} /> Respira3D.
        </div>

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="logo">
          <FontAwesomeIcon icon={faHeartbeat} /> Respira3D
        </div>
        <h2 style={{fontSize: 25}}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" style={{fontSize: 15}}>Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" style={{fontSize: 15}}>Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;