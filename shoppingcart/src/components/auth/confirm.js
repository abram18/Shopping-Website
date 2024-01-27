import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import loginStyles from './login.module.css';
import { LoadingButton } from '@mui/lab';
import { submitToken } from '../../services/auth'
import { useNavigate } from 'react-router-dom';

function Confirm() {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [tokenData, setTokenData] = useState("") // Set tokenData as a string
  const [open, setOpen] = useState(false)
  const [wrongData, setWrongData] = useState({
    status: true,
    infoText: 'An error occured...'
  })

  const handleForm = e => {
    setTokenData(e.target.value) // Set tokenData directly as a string
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
          Email Verification
        </Typography>
        <TextField autoComplete="off" id="token" label="Verification Code" variant="outlined" onChange={handleForm} value={tokenData}/>
        <p>Check your email inbox for the verification code.<br></br>You may also click the link sent to verify your email.</p>
        {loading ?
          <LoadingButton loading variant="contained" className='btn'>
            Verify
          </LoadingButton>:
          <Button variant="contained" type='submit' className='btn' onClick={() => {
            submitToken({ tokenData, setLoading, setWrongData, navigate }) // Pass tokenData as a string
          }}
          >Verify</Button>
        }
        <Button variant="text" color='success' href='/'>Email already verified? Log In</Button>
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

export default Confirm
