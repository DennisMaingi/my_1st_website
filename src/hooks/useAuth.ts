import { useState, useEffect } from 'react';

interface User {
  username: string;
  role: 'client' | 'admin';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('digitalRenaissanceUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('digitalRenaissanceUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('digitalRenaissanceUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('digitalRenaissanceUser');
  };

  const isAdmin = user?.role === 'admin';
  const isClient = user?.role === 'client';
  const isAuthenticated = !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isClient,
    login,
    logout
  };
};