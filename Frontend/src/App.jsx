import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import CreateQuiz from './Pages/CreateQuiz';
import QuizDetails from './Pages/QuizDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
      </Routes>
    </Router>
  );
}

export default App
