import MainListItems from "./ListItems";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AccountCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import * as React from "react";
import { toggleSidebar } from "../store/dashboardSlice";

import { useDispatch, useSelector } from "react-redux";
const drawerWidth = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.dashboard.isSidebarOpen);

  return (
    <Drawer variant="permanent" open={isSidebarOpen}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={() => dispatch(toggleSidebar(isSidebarOpen))}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Avatar style={{ marginLeft: "85px", marginBottom: "5px", marginTop: "5px" }}>
        <AccountCircle />
      </Avatar>
      <Divider />
      <List component="nav">
        <MainListItems />
      </List>
    </Drawer>
  );
};

export default Sidebar;