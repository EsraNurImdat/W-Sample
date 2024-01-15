import Navigator from "./Navigator";
import Sidebar from "./SideBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import UserTable from "./Projects";

const defaultTheme = createTheme();
function Layout ()  {
  return(
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navigator/>
        <Sidebar/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Box sx={{ flex:1}}>
             <UserTable/>
          </Box>    
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Layout;