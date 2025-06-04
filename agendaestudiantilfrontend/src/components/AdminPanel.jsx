import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  authService from '../services/api/auth.js';
import usuariosService from '../services/api/usuarios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await usuariosService.getAll();
        setUsers(data);
      } catch (error) {
        console.error('Error cargando usuarios:', error);
        if (error.response?.status === 401) {
          navigate('/');
        }
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este usuario?')) {
      await usuariosService.delete(id);
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.idUsuario}>
              <td>{user.idUsuario}</td>
              <td>{user.nombre} {user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <button className="btn-edit">
                  <i className="bi bi-pencil"></i> Editar
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(user.idUsuario)}
                >
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;