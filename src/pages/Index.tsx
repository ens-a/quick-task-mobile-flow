import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import ExecutorDashboardPage from './executor/DashboardPage';
import ManagerDashboardPage from './manager/DashboardPage';
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const { isAuthenticated, currentUser, userType, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  if (userType === 'manager') {
    return <ManagerDashboardPage currentUser={currentUser} onLogout={logout} />;
  }

  return <ExecutorDashboardPage currentUser={currentUser} onLogout={logout} />;
};

export default Index;
