import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loginStyles from './login.module.css';
import { LoadingButton } from '@mui/lab';
import { submitLogin } from '../../services/auth'

function Login() {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [wrongCredentials, setWrongCredentials] = useState({ wrongData: false, infoText: '' })
  const [open, setOpen] = useState(false)
  const handleForm = e => {
    const tempData = { ...loginData }
    tempData[e.target.id] = e.target.value
    console.log(tempData)
    setLoginData(tempData)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  return (
    <div className={loginStyles.container}>
      <Stack spacing={2} className={loginStyles.card} justifyContent="center" alignItems="center">
        <img src='https://www.freepnglogos.com/uploads/shopee-logo/logo-shopee-png-images-download-shopee-1.png' alt='logo' height={100} />
        <Typography variant="h5" component="h2" fontWeight={50}>
          Log In
        </Typography>
        <TextField autoComplete="off" id="username" label="Username" variant="outlined" onChange={e => handleForm(e)} value={loginData.username}/>
        <TextField type='password' id="password" label="Password" variant="outlined" onChange={e => handleForm(e)} value={loginData.password}/>
  
        {loading ?
          <LoadingButton loading variant="contained" className='btn'>
            Log In
          </LoadingButton>:
          <Button variant="contained" type='submit' className='btn' onClick={() => {
              submitLogin({ loginData, setWrongCredentials, navigate, setOpen, setLoading })
            }}
          >Log In</Button>
          }
        <Button variant="text" color='success' href='/register'>New to Shopee? Create Account</Button>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {wrongCredentials.infoText}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
}

export default Login