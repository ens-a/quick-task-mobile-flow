
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
import AdminDashboard from '../components/AdminDashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [userType, setUserType] = useState<'executor' | 'manager'>('executor');

  const handleLogin = (phone: string, type: 'executor' | 'manager') => {
    setCurrentUser(phone);
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    setUserType('executor');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (userType === 'manager') {
    return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
};

export default Index;
