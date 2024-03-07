import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../store/dashboardSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { toggleSidebar } from "../../store/dashboardSlice";
//dashboard u acar
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
          backgroundImage: 'url("https://s.tmimgcdn.com/scr/800x500/296200/premium-vektor-arkaplan-resimleri--yuksek-kaliteli-arkaplan--modern-hd-arka-plan-goruntuleri_296286-original.jpg")',
          backgroundSize: 'cover',
          minHeight: '1000px',
        },
      },
    },
  },
});
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Navigator() {
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state) => state.dashboard.isSidebarOpen);

  return (
    <ThemeProvider theme={customTheme}>
    <AppBar position="absolute" open={isSidebarOpen}>
      <Toolbar
        sx={{
          pr: "24px", 
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(toggleSidebar(isSidebarOpen))}
          sx={{
            marginRight: "36px",
            ...(isSidebarOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          W-Sample
        </Typography>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}
export default Navigator;