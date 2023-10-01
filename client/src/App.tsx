import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './layout';
import LandingPage from './landing/Page';
import GamePage from './game/Page';
import LoginPage from './login/Page';
import { SessionProvider } from './AuthContext';
import RegistrationPage from './registration/Page';
import AccountPage from './account/Page';
import LogoutPage from './logout/Page';

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="game" element={<GamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}
