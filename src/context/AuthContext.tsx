import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type User = {
  email: string;
  role: string;
};

type StoredUser = User & {
  expiresAt: number;
};

type AuthContextType = {
  user: StoredUser | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const EXPIRATION_MINUTES = 1; // nastav si, jak dlouho má být session platná

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<StoredUser | null>(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    const parsed: StoredUser = JSON.parse(stored);
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem('user');
      return null;
    }
    return parsed;
  });

  const login = (userData: User) => {
    const expiresAt = Date.now() + EXPIRATION_MINUTES * 60 * 1000;
    const storedUser: StoredUser = { ...userData, expiresAt };
    localStorage.setItem('user', JSON.stringify(storedUser));
    setUser(storedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Automatické odhlášení po vypršení session
  useEffect(() => {
    if (user && user.expiresAt) {
      const timeout = setTimeout(() => {
        logout();
        alert('Vaše přihlášení vypršelo. Přihlaste se znovu.');
      }, user.expiresAt - Date.now());
      return () => clearTimeout(timeout);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};