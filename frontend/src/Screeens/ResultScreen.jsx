import * as React from 'react';
import { useState } from 'react';
import Navigator from "../Components/Navigator";
import Sidebar from "../Components/SideBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ResultTable from "../Components/ResultPage";
import {useNavigate} from "react-router-dom";

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#00897b',
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
const e = "";

function ResultScreen ()  {

    return(
      <ThemeProvider theme={customTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navigator/>
          <Sidebar/>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Box sx={{ flex:1}}>
              <ResultTable/>
            </Box>    
          </Box>
        </Box>
      </ThemeProvider>
    );
};
export default ResultScreen;