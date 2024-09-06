import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserDetail from './pages/UserDetails';

function App() {
  return (
    <div className=' min-h-screen bg-blue-100'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
