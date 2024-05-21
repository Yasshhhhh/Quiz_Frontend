import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UploadPDF from './pages/UploadPDF';
import Topic from './pages/Topic';
import QuizPage from './pages/QuizPage';
import Navbar from './pages/Navbar';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login';
import UserHistory from './pages/UserHistory';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/pdf" element={<ProtectedRoute><UploadPDF /></ProtectedRoute>} />
            <Route path="/topic" element={<ProtectedRoute><Topic /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><UserHistory /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
