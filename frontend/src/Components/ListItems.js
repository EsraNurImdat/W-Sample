import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LinkIcon from '@mui/icons-material/Link';


export default function MainListItems() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token'ı local storage'dan sil
    localStorage.removeItem('token');
    // Ana sayfaya yönlendir
    navigate("/");
  };

  return (
    <>
      <ListItemButton href="/searchscreen">
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search Page" />
      </ListItemButton>
      <ListItemButton href="/projectscreen">
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary="Projects Page" />
      </ListItemButton>
      <ListItemButton href="/resultscreen">
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary="Result Page" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon/>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </>
  );
}
