/*
import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";
import { blue } from '@mui/material/colors';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const customTheme = createTheme({
 palette: {
    contrastThreshold: 4.5,
    darker: blue[900],
 
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url("https://i.pinimg.com/564x/4f/d4/97/4fd4972cb3cf77fda159e722cf1fc6ac.jpg")',
          backgroundSize: 'cover',
          minHeight: '1000px',
        },
      },
    },
  },
});

export default function Register() {
  const [passwordError, setPasswordError] = React.useState('');
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  React.useEffect(() => {
    // code that relies on updated formData values
    // check form data , her degişimde render olacak
    console.log(formData);
  }, [formData]);

  const handleSubmit = (event) => {
    
    event.preventDefault();

    //For register backend - Serra
    //const axios = require('axios');

    const data = {
      password: formData.password,
      username: formData.username,
      lastName: formData.lastName,
      firstName: formData.firstName
    };

    const response_axios = axios.post('http://localhost:5000/register', data)
      .then(function (response) {
        console.log(response);

        setStatus("done");



        navigate("/");
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data.message)
      });
     console.log("response_axios",response_axios)
    
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#01579b' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  color="warning"
                  value={formData.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  color="warning"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                  color="warning"
                  value={formData.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  color="warning"
                  value={formData.password}
                />
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ":hover": {
                  bgcolor: "#004d40",
                },
              }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {status === "done" && (
          <div>
            <Alert
              sx={{
                mt: -5,
                mb: 2,
                marginLeft: -6,
              }}
              severity="success"
            >
              Successfully Registered!
            </Alert>

          </div>
        )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}*/

import * as React from 'react';
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { blue } from '@mui/material/colors';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const customTheme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    darker: blue[900],

  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url("https://i.pinimg.com/564x/4f/d4/97/4fd4972cb3cf77fda159e722cf1fc6ac.jpg")',
          backgroundSize: 'cover',
          minHeight: '1000px',
        },
      },
    },
  },
});

export default function Register() {
  const [passwordError, setPasswordError] = React.useState('');
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // Yükleme durumu için state

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  useEffect(() => {
    // code that relies on updated formData values
    // check form data , her degişimde render olacak
    console.log(formData);
  }, [formData]);

  const handleSubmit = (event) => {

    event.preventDefault();
    setLoading(true); // Kayıt işlemi başladığında yüklemeyi başlat

    const data = {
      password: formData.password,
      username: formData.username,
      lastName: formData.lastName,
      firstName: formData.firstName
    };

    axios.post('http://localhost:5000/register', data)
      .then(function (response) {
        console.log(response);
        setStatus("done");
        navigate("/");
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data.message)
      })
      .finally(() => {
        setLoading(false); // İşlem tamamlandığında yüklemeyi durdur
      });

  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#01579b' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  color="warning"
                  value={formData.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  color="warning"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                  color="warning"
                  value={formData.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  color="warning"
                  value={formData.password}
                />
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ":hover": {
                  bgcolor: "#004d40",
                },
              }}
              disabled={loading} // Yükleme durumunda düğmeyi devre dışı bırak
              startIcon={<HowToRegIcon />}
            >
              {loading ? "Loading..." : "Register"} {/* Yükleme durumuna göre düğme metnini değiştir */}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {status === "done" && (
              <div>
                <Alert
                  sx={{
                    mt: -5,
                    mb: 2,
                    marginLeft: -6,
                  }}
                  severity="success"
                >
                  Successfully Registered!
                </Alert>
              </div>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
