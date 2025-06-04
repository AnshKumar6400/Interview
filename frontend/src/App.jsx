import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import FormPage from './pages/FormPage'
import TaskTable from './pages/TaskTable'
function App() {

  return (
    <>
   
     <Router>
        <Navbar/>
      <Routes>
        
<Route element={<TaskTable/>}path="/tasktable"/>

      </Routes>
     </Router>
    </>
  )
}

export default App
