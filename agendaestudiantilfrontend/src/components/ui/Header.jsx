import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/api/auth';

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <img 
          src="/img/logo_unpaz.png" 
          alt="UNPAZ" 
          className="logo" 
          onClick={() => navigate('/')}
        />
        <h1 className="pacifico-regular">Agenda Estudiantil</h1>
      </div>

      <div className="user-actions">
        {user ? (
          <>
            <span>Hola, {user.nombre}</span>
            {user.rol === 'admin' && (
              <button 
                className="btn-admin"
                onClick={() => navigate('/admin')}
              >
                <i className="bi bi-gear"></i> Admin
              </button>
            )}
            <button className="btn-logout" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Salir
            </button>
          </>
        ) : (
          <button className="btn-login" onClick={() => navigate('/login')}>
            <i className="bi bi-box-arrow-in-right"></i> Ingresar
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;