import './App.css';
import Clients from './Components/Clients/Clients';
import Container from '@mui/material/Container';
import Header from './Components/Header/Header';
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Orders from './Components/Orders/Orders';
import Home from './Components/Home';


function App() {
  return (
    <>
       <Header />
      <Container maxWidth="md">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='clients' element={<Clients />} />
          <Route path='orders' element={<Orders/>} />
        
       </Routes>
        
        
      </Container>
      
    </>
  );
}

export default App;
