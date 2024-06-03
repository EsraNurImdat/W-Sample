import React from "react";
import SearchBA from "../Components/Search2";
import { Box, Container } from "@mui/material";
import Navbar from "../Components/NavBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Wlogo from "../assets/Wlogo.png";

// Tema oluşturma kısmı
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
          backgroundSize: 'cover',
          minHeight: '1000px',
        },
      },
    },
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Container
        maxWidth="false"
        disableGutters
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative", // Konumlandırma
            
          }}
        >
          <Navbar style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 1000,
          }} />
         
          <img
            src={Wlogo}
            alt="Logo"
            style={{
              marginTop: "100px", // Boşluğu azalttık
              width: "70%", // Yüzde cinsinden boyutlandırma
              height: "auto",
              marginBottom: -180,
              maxWidth: "500px", // Maksimum genişlik belirlendi
            }}
          />
          <Box mt={0} > {/* Aralarındaki boşluğu kontrol etmek için Box bileşeni ekledik */}
            <SearchBA />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
