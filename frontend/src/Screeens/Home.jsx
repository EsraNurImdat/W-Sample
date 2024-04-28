/*import React from "react";
import SearchBA from "../Components/Search2";
import { Box, Container, Typography } from "@mui/material";
import Navbar from "../Components/NavBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
//home sayfası icin belirlenen tema. icerisinde sayfanın temel rengini, background ayarları ve mui css componentlarını ayarlar.
//baseline: componentların sayfa içindeki düzeni
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
//Home: bu sayfanın main fonksiyonudur.
//bu fonksiyonu dışarı export edilen fonksiyonudur, yani diğer sayfalardan bu fonksiyona ulaşılabilir.
const Home = () => {
  return (
    //themeprovider yukarıda specify edilen temayı bu sayfa için uyarlar
    <ThemeProvider theme={customTheme}>  
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        p: {
          xs: 2,
          sm: 5,
          md: 2,
        },
        backgroundImage: 'url("https://i.pinimg.com/564x/f9/fc/60/f9fc604bf458cf27d0bd1884be38d958.jpg")', //background image
        minHeight: "1000px",
        borderRadius: {
          xs: "0px 0px 27px 27px",
          md: "0px 0px 54px 54px",
        },
       
      }}
    > 
      <Box //Box, Grid, Container sayfayı parçalara bölüp sayfadaki düzeni ayarlamayı sağlar. Bu Box'da Navbar'ın düzeni için konuldu.
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        
        <Navbar   style={{    position: "absolute", //dışarıdan importladığımız Navbar ve SearchBA buralarda kullanıldı.
        //SearchBA arama butonunun fonksiyonu. arama butonu UI'nı displayler.
        //Navbar da login register sayfalarına yönlendirilmesine yardımcı oluyor.
      marginTop: -200,
      display: "flex",
      justifyContent: "space-between",
      width: "10%",
    
        }} />
        <Typography
          sx={{
            color: "#01579b",
            marginTop: "196.5px",
            textAlign: "center",
            fontWeight: "600",
            marginLeft: -8,
            fontSize: {
              xs: "38px",
              md: "48px",
            },
            lineHeight: "62px",
            mb: -7,
            fontFamily:"Apple Color Emoji", //typography text yazısı yazmamızı sağlar.
          }}
        >
          W-SAMPLE 
        </Typography> 
      <SearchBA/>
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default Home;

*/
/*
import React from "react";
import SearchBA from "../Components/Search2";
import { Box, Container, Typography } from "@mui/material";
import Navbar from "../Components/NavBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        sx={{
          p: {
            xs: 2,
            sm: 5,
            md: 2,
          },
          backgroundImage: 'url("https://i.pinimg.com/564x/f9/fc/60/f9fc604bf458cf27d0bd1884be38d958.jpg")',
          minHeight: "1000px",
          borderRadius: {
            xs: "0px 0px 27px 27px",
            md: "0px 0px 54px 54px",
          },
          // Media query ekleyerek düzeni ekran genişliğine göre ayarlayalım
          "@media (max-width: 600px)": {
            backgroundImage: 'none', // Küçük ekranlarda arka plan görüntüsünü kaldırabiliriz
            borderRadius: "0", // Küçük ekranlarda köşeleri düzleştirelim
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Navbar style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 1000,
          }} />
          <Typography
            sx={{
              color: "#01579b",
              marginTop: "196.5px",
              textAlign: "center",
              fontWeight: "600",
              marginLeft: -8,
              fontSize: {
                xs: "38px",
                md: "48px",
              },
              lineHeight: "62px",
              mb: -7,
              fontFamily: "Apple Color Emoji",
            }}
          >
            W-SAMPLE
          </Typography>
          <SearchBA />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;


*/
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
