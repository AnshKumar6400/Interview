import { useState } from 'react'
import './App.css'
import Navbar from './pages/Navbar'
import {BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Apartments from './pages/Apartments'
function App() {

  return (
    <>
   
     <Router>
        <Navbar/>
      <Routes>
        
<Route element={<Apartments/>} path='/apartments'/>

      </Routes>
     </Router>
    </>
  )
}

export default App
