import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import registerStyles from './register.module.css';
import { submitRegister } from '../../services/auth'
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

function Register() {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: ["user"]
  })
  const tempData = { ...registerData }
  const [open, setOpen] = useState(false)
  const [wrongData, setWrongData] = useState({
    status: true,
    infoText: 'An error occured...'
  })
  const getInitialState = () => {
    const input = "admin";
    return input;
  };

  const [input, setInput] = useState(getInitialState);

  const saveInput = (e) => {
    setInput(e.target.value);
    if (input.length !== 0) {
      tempData['role'].pop()
      tempData['role'].push(input)
    }
    setRegisterData(tempData)
    console.log(input)
    console.log(tempData)
  }

  const handleForm = e => {
    tempData[e.target.id] = e.target.value
    console.log(e.target.id)
    console.log(e.target.value)
    console.log(tempData)
    setRegisterData(tempData)
    console.log(registerData)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const register = () => {
    submitRegister({ registerData, setRegisterData, setWrongData, setOpen, navigate, setLoading })
  }
  return (
    <div className={registerStyles.container}>
      <Stack spacing={2} className={registerStyles.card} justifyContent="center" alignItems="center">
      <img src='https://www.freepnglogos.com/uploads/shopee-logo/logo-shopee-png-images-download-shopee-1.png' alt='logo' height={100} />
        <Typography variant="h5" component="h2" fontWeight={50}>
          Sign Up
        </Typography>
        <TextField id="username" autoComplete="off" onChange={e => handleForm(e)} value={registerData.username} label="Username" variant="outlined" />
        <TextField id="email" autoComplete="off" onChange={e => handleForm(e)} value={registerData.email} label="Email" variant="outlined" />
        <TextField id="password" type="password" onChange={e => handleForm(e)} value={registerData.password} label="Password" variant="outlined" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>I am a:</label>
          <select placeholder="Role" value={input} onChange={saveInput} style={{ borderRadius: '4px', padding: '5px' }}>
            <option value="admin">Buyer</option>
            <option value="user">Seller</option>
          </select>
        </div>
        {loading ?
          <LoadingButton loading variant="contained" className='btn'>
            Register
          </LoadingButton> :
          <Button variant="contained" className='btn' onClick={() => { register() }}>Register</Button>
        }
        <Button variant="text" color='success' href='/'>Have an Account? Log In</Button>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity={wrongData.status ? "error" : "success"} sx={{ width: '100%' }}>
            {wrongData.infoText}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
}

export default Register