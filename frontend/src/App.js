import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchB from './Components/searchbar';
import Login from './Screeens/LoginPage';
import Register from './Screeens/RegisterPage';
import Home from './Screeens/Home';
import ResultScreen from './Screeens/ResultScreen';
import ProjectScreen from './Screeens/ProjectScreen';
import SearchScreen from './Screeens/SearchScreen';
import ResultTable2 from './Screeens/ResultScreen2';

function App() {
  return (
    
      <Routes>
        <Route path="/searchbar" element={ <SearchB/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/projectscreen" element={<ProjectScreen/>} />
        <Route path="/resultscreen" element={<ResultScreen/>} />
        <Route path="/searchscreen" element={<SearchScreen/>} />
        <Route path="/resulttable2" element={<ResultTable2/>} />
       
      </Routes>
   
  );
}

export default App;
