// src/contexts/AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'usuario';
  token?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  iniciarSesion: (email: string, contraseña: string) => Promise<void>;
  cerrarSesion: () => void;
  registrar: (nombre: string, email: string, contraseña: string) => Promise<void>;
  estaAutenticado: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const iniciarSesion = async (email: string, contraseña: string) => {
    // Simulación de API
    const usuarioMock: Usuario = {
      id: '1',
      nombre: 'Administrador',
      email: email,
      rol: 'admin',
      token: 'mock-jwt-token'
    };

    if (!email || !contraseña) {
      throw new Error('Email y contraseña son requeridos');
    }

    setUsuario(usuarioMock);
    localStorage.setItem('usuario', JSON.stringify(usuarioMock));
  };

  const registrar = async (nombre: string, email: string, contraseña: string) => {
    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      email: email.trim(),
      rol: 'usuario',
      token: 'mock-jwt-token'
    };

    if (!nombre || !email || !contraseña) {
      throw new Error('Todos los campos son requeridos');
    }

    setUsuario(nuevoUsuario);
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const value = {
    usuario,
    iniciarSesion,
    cerrarSesion,
    registrar,
    estaAutenticado: !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};