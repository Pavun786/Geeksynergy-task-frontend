import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import {API} from "./Global";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../src/App.css"
import ProfileList from "../src/assets/profile.webp"


export function UserList(){

    const[data,setData]=useState([])
    const navigate = useNavigate()
    const emailId = localStorage.getItem("Email")
   
    useEffect(()=>{
       fetch(`${API}/auth/all-users`,{
        method:"GET",
       })
      .then((data)=>data.json())
      .then((mv)=>setData(mv))
      },[])
    
      console.log(data)
   
      const deleteFunction = async(id)=>{
         
         const data = await fetch(`${API}/auth/${id}`,{
            method : "DELETE"
         })

         const res = await data.json()

         if(data.status == 200){
           alert("User deleted successfully")
           localStorage.clear();
           navigate("/")
         }
      }
   
    return(

       <div className="userlist-container">
        <img src={ProfileList} className="userlist-img"/>
        <div className="table">
          <h2>User-List</h2>
          <TableContainer component={Paper} >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell align="right">UserName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Mobile</TableCell>
            <TableCell align="right">Profession</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((ele,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{ele.Name}</TableCell>
              <TableCell align="right">{ele.Email}</TableCell>
              <TableCell align="right">{ele.Mobile}</TableCell>
              <TableCell align="right">{ele.Profession}</TableCell>
              <TableCell align="right">
                <button disabled={ele.Email == emailId ? false : true } onClick={()=>navigate(`/edit/${ele._id}`)}>Edit</button>
                <button disabled={ele.Email == emailId ? false : true } onClick={()=>deleteFunction(ele._id)}>Delete</button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
        </div>
    )
}