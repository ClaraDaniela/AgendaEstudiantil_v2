// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MateriaDetail from './components/materias/MateriaDetail';
import MateriasList from './components/materias/MateriasList';
import AdminPanel from './components/admin/AdminPanel';
import UserManagement from './components/admin/UserManagement';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Loading from './components/common/Loading';

const AppContent = () => {
  const { usuario, estaAutenticado, loading } = useAuth();
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    if (estaAutenticado) {
      // Cargar materias
    }
  }, [estaAutenticado]);

  if (loading) return <Loading />;

  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={!estaAutenticado ? <LoginForm /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!estaAutenticado ? <RegisterForm /> : <Navigate to="/" replace />} />
        
        {estaAutenticado ? (
          <>
            <Route path="/" element={<MateriasList materias={materias} />} />
            <Route path="/materia/:id" element={<MateriaDetail />} />
            
            {usuario?.rol === 'admin' && (
              <>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/users" element={<UserManagement />} />
              </>
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;