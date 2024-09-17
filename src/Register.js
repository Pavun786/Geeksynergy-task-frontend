import * as React from 'react';
import { useState } from 'react';
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


const RegisterValidationSchema = yup.object({
    Name:yup.string().required(),
    Email:yup.string().required(),
    Mobile:yup.number().required(),
    Password:yup.string().required(),
    Profession : yup.string().required(),
       
   });
  export function Register(){
    
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(true);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues:{
            Name:"",
            Email:"",
            Mobile : "",
            Password:"",
            Profession : ""
        },
   
        validationSchema:RegisterValidationSchema,

       onSubmit:async (values)=>{
        console.log(values)
       
        const signup = await fetch(`${API}/auth/register`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{"Content-type": "application/json"},
      
           })
           if (signup.status === 500) {
            alert(signup.message);
          
          } else
           { 
            const result=await signup.json() 
            alert("User Registered Successfully..")
            navigate("/");
           }
       }
    });
     
    return(
        <div >
            <h3 className='register'>Register</h3>
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
            label="Email" 
          variant="outlined"
          value={formik.values.Email}
            onChange={formik.handleChange}
            name="Email" 
            onBlur={formik.handleBlur} 
            error={formik.touched.Email && formik.errors.Email}
            helperText={formik.touched.Email && formik.errors.Email ? formik.errors.Email : null}/>

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
          label="Password" 
          variant="outlined"
          type={showPassword ? 'password' : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={formik.values.Password}
            onChange={formik.handleChange}
            name="Password" 
            onBlur={formik.handleBlur} 
           
            error={formik.touched.Password && formik.errors.Password}
            helperText={formik.touched.Password && formik.errors.Password ? formik.errors.Password : null}/>
           

           <TextField id="outlined-basic" 
            label="Profession" 
            variant="outlined"
            value={formik.values.Profession}
            onChange={formik.handleChange}
            name="Profession" 
            onBlur={formik.handleBlur} 
            error={formik.touched.Profession && formik.errors.Profession}
            helperText={formik.touched.Profession && formik.errors.Profession ? formik.errors.Profession : null}/>       


          <Button type="submit" variant="contained">submit</Button>
          
          <p> If you have an account <Link to="/">Click-Here</Link> </p>
     
          </form>
        </div>
    )
 }
 