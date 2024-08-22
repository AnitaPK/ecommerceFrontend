import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestLogin from './pages/TestLogin';
import TestRegister from './pages/TestRegister';

function App() {
  const { user, token, login, logout } = useAuth();

  console.log('App user:', user);
  console.log('App token:', token);

  return (
    <BrowserRouter>
      <Navbar user={user} logout={logout} token={token} />
      <Routes>
        <Route path="/login" element={<TestLogin />} />
        <Route path="/register" element={<TestRegister />} />
        <Route path="/dashboard" element={<DashboardPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
