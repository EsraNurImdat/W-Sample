import Navigator from "../Components/Navigator";
import Sidebar from "../Components/SideBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from "@mui/material";
import SearchBA from "../Components/Search";


const customTheme = createTheme({
    palette: {
    },
      primary: {
        main: '#00897b',
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
function SearchScreen ()  {
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
          <Typography
          sx={{
            color: "#00897b",
            marginTop: "196.5px",
            textAlign: "center",
            fontWeight: "600",
            fontSize: {
              xs: "38px",
              md: "48px",
            },
            lineHeight: "62px",
            mb: -20,
            fontFamily:"Apple Color Emoji",
          }}
        >
          W-SAMPLE
        </Typography>
             <SearchBA/>
          </Box>    
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default SearchScreen;