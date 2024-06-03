import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Screeens/LoginPage';
import Register from './Screeens/RegisterPage';
import Home from './Screeens/Home';
import ResultScreen from './Screeens/ResultScreen';
import ProjectScreen from './Screeens/ProjectScreen';
import SearchScreen from './Screeens/SearchScreen';
import ResultTable2 from './Screeens/ResultScreen2';
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      // Eğer kullanıcı /login, /register, /searchbar rotalarından birinde değilse ana sayfaya yönlendir
      if (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/resulttable2') {
        navigate("/");
      }
    }
  }, [location.pathname]); // Yalnızca location.pathname değiştiğinde useEffect'i tekrar çalıştır

  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/resulttable2" element={<ResultTable2 />} />
       
        {isLoggedIn ? (
          <>
            <Route path="/resultscreen" element={<ResultScreen />} />
            <Route path="/projectscreen" element={<ProjectScreen />} />
            <Route path="/searchscreen" element={<SearchScreen />} />
          </>
        ) : null}
      </Routes>
   
  );
}

export default App;
