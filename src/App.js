import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import { UserProvider } from './context/userContext';
import DashboardAside from './pages/DashboardAside'

function App() {

   return (
    <BrowserRouter>
    <UserProvider>

      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/*" element={<DashboardAside />}></Route>
      </Routes>
    </UserProvider>

    </BrowserRouter>
  );
}

export default App;
