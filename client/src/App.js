import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Owner from './components/Owner'
import LoginS from './components/LoginS'
import OwnerS from './components/OwnerS';
import LoginP from './components/LoginP';
import OwnerP from './components/OwnerP';
import Property from './components/property';
import Prop from './components/Prop'
import Propu from './components/Propu'
import './App.css'
import Display from './components/Display';
import UserDashboard from './components/UserDashBoard';


function App() {
  return (
    <>
    <Router>
      <Routes>
        
        <Route index element={<Home />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Owner" element={<Owner />} />
        <Route path="/LoginS" element={<LoginS />} />
        <Route path="/OwnerS" element={<OwnerS />} />
        <Route path="/LoginP" element={<LoginP />} />
        <Route path="/OwnerP" element={<OwnerP />} />
        <Route path="/Property" element={<Property />} />
        <Route path="/Prop" element={<Prop />} />
        <Route path="/Propu" element={<Propu  />} />
        <Route path="/Display" element={<Display />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
