// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';

// Tipos
export type RolUsuario = 'admin' | 'usuario';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
  token?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  error: string | null;
  iniciarSesion: (credenciales: { email: string; contraseña: string }) => Promise<void>;
  cerrarSesion: () => void;
  registrar: (datos: { nombre: string; email: string; contraseña: string }) => Promise<void>;
  estaAutenticado: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iniciarSesion = useCallback(async (credenciales: { email: string; contraseña: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulación de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const usuarioMock: Usuario = {
        id: '1',
        nombre: 'Admin',
        email: credenciales.email,
        rol: 'admin',
        token: 'mock-token'
      };

      setUsuario(usuarioMock);
      localStorage.setItem('usuario', JSON.stringify(usuarioMock));
    } catch (err) {
      setError('Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  }, []);

  const registrar = useCallback(async (datos: { nombre: string; email: string; contraseña: string }) => {
    // Implementación similar a iniciarSesion
  }, []);

  const value = useMemo(() => ({
    usuario,
    loading,
    error,
    iniciarSesion,
    cerrarSesion,
    registrar,
    estaAutenticado: !!usuario
  }), [usuario, loading, error, iniciarSesion, cerrarSesion, registrar]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};