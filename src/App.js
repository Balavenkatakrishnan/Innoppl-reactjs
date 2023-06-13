import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import HomeScreen from './homescreen';
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeScreen />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
