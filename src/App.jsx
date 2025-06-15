import React, { useEffect } from 'react'
import "./App.css"
import { Navigate, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx"
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader} from "lucide-react";
import { ToastContainer } from "react-toastify";
const App = () => {
  
 const {authUser,checkAuth,isChekingAuth}= useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth]
  )
 

 console.log({authUser});

 if(isChekingAuth && !authUser) return(
  <div className ="flex items-center justify-center h-screen" style={{color:"black"}}>
   <Loader className ="size-10 animate-spin "  />
  </div>
   

 )
  return (

    <div >

      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/>: <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ?<SignUpPage/>:<Navigate to ="/"/>}/>
        <Route path="/login" element={!authUser ?<LoginPage/>:<Navigate to ="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/>: <Navigate to="/login"/>}/>
      </Routes>


     <ToastContainer />

    </div>
  )
}

export default App