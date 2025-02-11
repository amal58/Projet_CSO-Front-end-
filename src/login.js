
import { Grid, Card, Tabs, Typography, Tab } from '@mui/material';

import iu from "./assets/logg.jpg"
import { TextField, Button, Box, Alert } from '@mui/material';

// validation






import "./loginreg.css"
import React from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}
const LoginReg = () => {
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
  const [values, setValues] = useState({
    //hatha kan email khw
    emailadmin: '',
    password: ''
  })
  const[errors , setErrors]=useState({});


  function handleInput(event) {
    const newObjt = {...values, [event.target.name]: event.target.value}
    setValues(newObjt)
  }

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const [token, setToken] = useState("");
  const[error , setError]=useState(false);
  const[error1 , setError1]=useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      
      const payload = {
        login: login,
        password: password,
      };
  
      if (!login || !password) {
        setError(true);
        return false;      
      }
  
      let response = await fetch("http://localhost:3000/api/utilisateur/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      console.log("vvvvv" + response)
  
      if (response.status === 200) {
        swal({
          title: "Connexion avec succès",
          icon: "success",
          button: "Valider",
        });
  
        let whoami = await response.json();
        console.log(whoami.Data.role);
      
        // Vérifier si l'utilisateur est un administrateur
        if (whoami.Data.role === 'admin') {
          // Mettre à jour le local storage avec les informations de l'utilisateur
          localStorage.setItem("user", JSON.stringify(whoami.Data));
          
          // Rediriger vers la page Dash si l'utilisateur est un administrateur
          navigate('/Dash');
        }  else if (whoami.Data.role === 'chefPupitre') {
          // Mettre à jour le local storage avec les informations de l'utilisateur
          localStorage.setItem("user", JSON.stringify(whoami.Data));
          
          // Rediriger vers la page Dash si l'utilisateur est un administrateur
          navigate('/DashP');
        } 
        else if(whoami.Data.role === 'choriste'){
          localStorage.setItem("user", JSON.stringify(whoami.Data));
          
          // Rediriger vers la page Dash si l'utilisateur est un administrateur
          navigate('/dashChoriste');
        }
        
        else {
          // Mettre à jour le local storage avec les informations de l'utilisateur
          localStorage.setItem("user", JSON.stringify(whoami.Data));
          
          // Rediriger vers une autre page si l'utilisateur n'est pas un administrateur
          navigate('/');
        }
      } else {
        swal({
          title: "Adresse ou Mot de passe invalide",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
        console.log("Problème de connexion");
      }
    
      // Mettre à jour le local storage avec les informations de l'utilisateur
      let whoami = await response.json();
      console.log(response);
      console.log(whoami.Data);
      if (whoami?.Data !== undefined) {
        localStorage.setItem("user", JSON.stringify(whoami.Data));
      }
      if (whoami?.token !== undefined) {
        localStorage.setItem("token", JSON.stringify(whoami.token));
      }
  
      setUser(whoami?.Data);
      setToken(whoami.token);
      console.log({ user: user });
      console.log({ token: token });
      console.log("local:" + localStorage.getItem("user"));
      console.log(localStorage.getItem("token"));
    } catch (e) {
      console.log("erreur");
    }
  }
  


  
function handleValidation(event) {
  event.preventDefault();
    
}





  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return <>
   <form  onSubmit={onSubmit}>
    <Grid container sx={{ height: "100vh" }}>
      <Grid item 
      lg={7} 
      sm={5} sx={{
      backgroundImage: `url(${iu})`,
      width: 200,
      height: 700,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: { xs: 'none', sm: 'block' },
        
      }}>
      </Grid>
      <Grid item lg={5} sm={7} xs={12}>
        <Card sx={{ width: '100%', height: '93%' }}>
          <Box sx={{ mx: 3, height: 700 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
             
              <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>
                <Tab label='Connexion' sx={{ textTransform: 'none', fontWeight: 'bold' , color:"blue" , size:"20px" }}></Tab>
                
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
            {/* <UserLogin/>*/}

            <Box  noValidate sx={{ mt: 1 }} id='login-form'  onSubmit={handleValidation} >
      <br/><br/><br/>
      
     
      <TextField margin='normal' 
      fullWidth 
      id='email' 
      name='emailadmin' 
      label='Email' 
      
      //onInput={handleInput}
      onChange={(e) => {
        setLogin(e.target.value);
      
      }}
       />
           {/*  {errors.emailadmin && <p style={{color: "red"}}>{errors.emailadmin}</p>}  */}
           {error && !regEx.test(login) &&<p style={{color: "red"}} > vérifier email</p>}
  
             <br/><br/>
   <div className='form-group'>
      <TextField margin='normal' 
       fullWidth 
      id='password' 
      name='password' 
      
      label='Mot de passe' 
      class="form-control"
      //type='password' 
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      //onInput ={handleInput}
      type={showPassword ? 'text' : 'password'}
      onClick={togglePasswordVisibility}
    
      />
        {errors.password && <p style={{color: "red"}}>{errors.password}</p>} 
        <span
        
          className="input-group-addon"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEye />: <FaEyeSlash /> }
        </span>
        
        </div>
      
      <Box textAlign='center'>
      <br/>
     
        {/*<Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>*/}
        
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, px: 5 }}
                 
              
                >
                  Login
                </Button>

                <Link to="/verif">Vous êtes candidat?</Link>
      </Box>
      
    </Box>


            </TabPanel>
           
          </Box>
          <Box textAlign="center" sx={{ mt: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
           
              </Typography>
            </Box>
        </Card>
      </Grid>
    </Grid>
    </form>
  </>;
};

export default LoginReg;