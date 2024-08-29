import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/search-app-demo" element={<Home />} />
    </Routes>
  </Router>
  );
}

export default App;
