import './App.css';
import {Routes,Route,Link, Navigate,useParams, useNavigate} from "react-router-dom"
import { useState} from "react";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Login } from './Login';
import { Register } from './Register';
import { UserList } from './UserList';
import { ProtectedRoute } from './ProtectedRoute';
import EditUser from './EditUser';




function App() {
  
  
  const navigate=useNavigate()
  
   const token = localStorage.getItem("token")
   const userName = localStorage.getItem("Name")

   const LoggingOut=()=>{
  
     localStorage.clear()
     navigate("/")
  }

  return (
     
      <>
         <AppBar position="static">
        <Toolbar className='toolbar'>
          
           <h3>{userName}</h3>
         
           {
             token ?  <Button onClick={()=>LoggingOut()}color="inherit">
             Logout
            </Button> : "Login"
           } 
           
        </Toolbar>
      </AppBar> 
       
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/users"  element={
          <ProtectedRoute>
          <UserList/>
          </ProtectedRoute>
          }/>
         <Route path="/edit/:id" element={<EditUser/>}/>
        
      </Routes>
   </>
     
  )
        }
    
export default App;