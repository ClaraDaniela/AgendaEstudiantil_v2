import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/api/auth';
import './Login.css';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const { data } = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate(data.user.rol === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor intente nuevamente.');
      console.error('Error de login:', err);
    }
  };

  return (
    <div id="login-modal">
      <div id="login-modal-content">
        <h2 className="pacifico-regular">Bienvenido</h2>
        
        {error && (
          <div className="error-message" style={{ 
            color: '#dc3545', 
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
          
          <button type="submit">
            <i className="bi bi-box-arrow-in-right"></i> Ingresar
          </button>
        </form>

        <div className="login-footer">
          <p>¿Primera vez aquí? <a href="/registro">Crea una cuenta</a></p>
        </div>
      </div>
      
      <div className="wave"></div>
    </div>
  );
};

export default Login;