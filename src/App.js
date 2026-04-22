import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import AboutPage from './components/AboutPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}