// src/AppRouter.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { PuzzlePage } from './pages/puzzle/puzzle';
import { HomePage } from './pages/home/home';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/puzzle" element={<PuzzlePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
