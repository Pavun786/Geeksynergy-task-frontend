import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import { useNavigate,Link} from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function EditUser(){
    const {id} = useParams();
    const [user,setUser] = useState("")

    useEffect(()=>{
        fetchUser()
    },[])

    const fetchUser = async()=>{
        const data = await fetch(`${API}/auth/${id}`,{
            method : "GET"
        })
        const res = await data.json()

        setUser([res])
    }

    console.log(user)
    return(
        <div>
            { !user ? "Loading"  : <UserEditForm user={user} setUser={setUser}/>}
        </div>
    )
}






const UpdateValidationSchema = yup.object({
    Name:yup.string().required(),
   
    Mobile:yup.number().required(),
   
    Profession : yup.string().required(),
       
   });

   function UserEditForm({user}){
    
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(true);

     const formik = useFormik({

        initialValues:{
            Name:user[0].Name,
            Mobile :user[0].Mobile,
            Profession : user[0].Profession
        },
   
        validationSchema: UpdateValidationSchema,

       onSubmit:async (values)=>{
        console.log("val",values)
        console.log(user[0]._id)
       
        const data = await fetch(`${API}/auth/editUser/${user[0]._id}`,{
            method:"PUT",
            body:JSON.stringify(values),
            headers:{"Content-type": "application/json"},
      
           })
           if (data.status === 500) {
            alert(data.message);
          
          } else
           { 
            const result=await data.json() 
            alert("User Edited Successfully..")
            navigate("/users");
           }
       }
    });
     
    return(
        <div >
            <h3 className='register'>Edit User-Form</h3>
            <form className='register-container'onSubmit={formik.handleSubmit}>
          <TextField id="outlined-basic" 
          label="Name" 
          variant="outlined" 
          value={formik.values.Name}
            onChange={formik.handleChange}
            name="Name"
            onBlur={formik.handleBlur} 
           
            error={formik.touched.Name && formik.errors.Name}
            helperText={formik.touched.Name && formik.errors.Name ? formik.errors.Name : null}/>

      
     <TextField id="outlined-basic" 
          label="Mobile" 
          variant="outlined"
          value={formik.values.Mobile}
            onChange={formik.handleChange}
            name="Mobile" 
            onBlur={formik.handleBlur} 
            error={formik.touched.Mobile && formik.errors.Mobile}
            helperText={formik.touched.Mobile && formik.errors.Mobile ? formik.errors.Mobile : null}/>


           <TextField id="outlined-basic" 
            label="Profession" 
            variant="outlined"
            value={formik.values.Profession}
            onChange={formik.handleChange}
            name="Profession" 
            onBlur={formik.handleBlur} 
            error={formik.touched.Profession && formik.errors.Profession}
            helperText={formik.touched.Profession && formik.errors.Profession ? formik.errors.Profession : null}/>       


          <Button type="submit" variant="contained">Update</Button>
          
        
     
          </form>
        </div>
    )
 }
 

 export default EditUser;
