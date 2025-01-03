import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import Card from "@mui/material/Card";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Login(props) {
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Call the login function from AuthContext
    const loginResult = await login(data.get('userName'), data.get('password'));
   
    if (loginResult.success) {
      // Redirect and store user data after successful login
      const userName = data.get('userName'); // Extract userName from form data
      localStorage.setItem('userName', userName); // Save userName to localStorage
      toast.success("Login Success",{
        position:"top-center",
        autoClose: 700, // Auto close after 3 seconds
        hideProgressBar: true, // No progress bar
        closeOnClick: true, // Close on click
        pauseOnHover: true, // Pause on hover
        draggable: true, // Allow dragging the toast
        theme: "colored", // Colored theme
        className: "custom-toast", // Custom class
     
      })
      navigate('/dashboard');
      
    } else {
      // Set error message
      setErrorMessage(loginResult.message || 'Invalid username or password');
    }
  };

  const validateInputs = () => {
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');

    let isValid = true;

    if (!userName.value) {
      setUserNameError(true);
      setEmailErrorMessage('Enter user name');
      isValid = false;
    } else {
      setUserNameError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 1) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters long');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh'
        }}
      >
        <Card variant="outlined" sx={{ borderRadius: 5, bgcolor: '#fff', p:5 }}>

          <Box sx={{ mb: 5 }}>
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: { xs: '0.1rem', sm: '0.2rem' },
                fontSize: { xs: '1rem', sm: '1.4rem' },
                textAlign: 'center',
                color:'#777'
              }}
            >
              <Box sx={{ color: '#ff9800', display: 'inline-block' }}>D</Box>
              ataman{' '}
              <Box sx={{ color: '#ff9800', display: 'inline-block' }}>F</Box>
              ront{' '}
              <Box sx={{ color: '#ff9800', display: 'inline-block' }}>D</Box>
              esk
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >

            <FormControl sx={{ mb: 2 }}>
              <TextField
                error={userNameError}
                helperText={userNameErrorMessage}
                id="userName"
                type="userName"
                name="userName"
                autoComplete="userName"
                label="User Name"
                autoFocus
                fullWidth
                variant="standard"
                color={userNameError ? 'error' : 'primary'}
                sx={{
                  ariaLabel: 'userName',
                  '& .MuiInput-root': {
                    '&:after': {
                      borderColor: '#ff9800',
                      borderWidth: '2px',
                    },
                    ':hover:not(.Mui-focused)': {
                      '&:before': {
                        borderColor: '#ff9800',
                        borderWidth: '1px',
                      },
                    },
                  },
                }}
              />
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // autoFocus
                fullWidth
                variant="standard"
                color={passwordError ? 'error' : 'primary'}
                sx={{
                  ariaLabel: 'userName',
                  '& .MuiInput-root': {
                    '&:after': {
                      borderColor: '#ff9800',
                      borderWidth: '2px',
                    },
                    ':hover:not(.Mui-focused)': {
                      '&:before': {
                        borderColor: '#ff9800',
                        borderWidth: '1px',
                      },
                    },
                  },
                }}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Box>
              {errorMessage !== 'undefined' && errorMessage ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ErrorOutlineIcon sx={{ color: 'red', fontSize: 16 }} />
                  &nbsp;
                  <Box sx={{ fontSize: 12 }}>{errorMessage}</Box>
                </Box>
              ) : (
                ''
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              sx={{
                width: '40%',
                margin: 'auto',
                bgcolor: '#ff9800',
                borderRadius: 5,
                color: '#fff',
                fontWeight: 600,
                mt:5
              }}
            >
              Sign in
            </Button>

          </Box>

        </Card>
      </SignInContainer>
    </>
  );
}
