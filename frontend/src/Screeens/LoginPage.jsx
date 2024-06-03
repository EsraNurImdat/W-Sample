import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios
import CircularProgress from '@mui/material/CircularProgress';
import InputIcon from '@mui/icons-material/Input';
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#01579b',
    },
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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  useEffect(() => {
    console.log(username, password);
  }, [username, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // İşlem başladığında yüklemeyi başlat

    const data = {
      username: username,
      password: password,
    };

    axios.post('http://localhost:5000/login', data)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("username",response.data.username)
        console.log("token",response.data.token)
        navigate("/searchscreen");
      })
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while processing your request.");
        }
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
          <Avatar sx={{ m: 1, bgcolor: '#01579b'}}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              color="warning"
              value={username}
              onChange={handleUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="warning"
              value={password}
              onChange={handlePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,
                ":hover": {
                  bgcolor: "#004d40",
                }
               }}
              disabled={loading} // Yükleme durumunda düğmeyi devre dışı bırak
              startIcon={<InputIcon />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"} {/* Yükleme durumuna göre düğme metnini değiştir */}
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/register" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


