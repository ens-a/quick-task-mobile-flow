import { useState } from 'react';

export type UserType = 'executor' | 'manager';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: string;
  userType: UserType;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    currentUser: '',
    userType: 'executor',
  });

  const login = (phone: string, userType: UserType) => {
    setAuthState({
      isAuthenticated: true,
      currentUser: phone,
      userType,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      currentUser: '',
      userType: 'executor',
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
}; 