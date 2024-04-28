/*import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";

export const navLinks = [
    {
      id: 1,
      name: "Login",
      destination:"/login",
    },
    {
      id: 2,
      name: "Register",
      destination:"/register",
    },
    
  ];
  

const Navbar = () => {
  
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container
        maxWidth="xl"
        sx={{
          px: 75,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
        disableGutters
      >
       
        <Box
  sx={{
    display: {
      xs: "none",
      lg: "flex",
    },
    alignItems: "center",
    justifyContent: "center", 
    gap: "84px",
  }}
>
  {navLinks.map((navLinks) => (
    <Link
      href={navLinks.destination}
      key={navLinks.id}
      underline="hover" 
      color="#01579b"
      sx={{
        fontWeight: "300",
        fontSize: "28px",
        opacity: 2.0,
        ":hover": { bgcolor: "#004d40" },
        textAlign: "center", 
        textDecoration: "none", 
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "2px",
          bottom: 0,
          left: 0,
          backgroundColor: "#ad1457",
          transform: "scaleX(0)", 
          transformOrigin: "bottom right",
          transition: "transform 0.3s ease-out", 
        },
        "&:hover::after": {
          transform: "scaleX(1)", 
          transformOrigin: "bottom left",
        },
      }}
    >
      {navLinks.name}
    </Link>
  ))}
</Box>

       
      </Container>
    </AppBar>
  );
};
export default Navbar;*/
import React from "react";
import { AppBar, Container, Box, IconButton } from "@mui/material";
import Link from "@mui/material/Link";
import { Login, PersonAdd } from "@mui/icons-material";

export const navLinks = [
    {
      id: 1,
      name: "Login",
      destination:"/login",
      icon: <Login />,
    },
    {
      id: 2,
      name: "Register",
      destination:"/register",
      icon: <PersonAdd />,
    },
];

const Navbar = () => {
  
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container
        maxWidth="xl"
        sx={{
          px: 3,
          pt: 1,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
        disableGutters
      >
        <Box sx={{ flexGrow: 1 }}>
          <Link
            href="/"
            underline="none"
            color="#01579b"
            sx={{
              fontWeight: "600",
              fontSize: { xs: "24px", md: "32px" }, // Başlık metninin boyutunu ekran boyutuna göre ayarladık
              ":hover": { textDecoration: "none" },
            }}
          >
            W-SAMPLE
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "24px",
          }}
        >
          {navLinks.map((navLink) => (
            <Link
              key={navLink.id}
              href={navLink.destination}
              underline="none"
              color="#01579b"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "500",
                fontSize: { xs: "18px", md: "24px" }, // Bağlantı metinlerinin boyutunu ekran boyutuna göre ayarladık
                ":hover": { textDecoration: "underline" },
              }}
            >
              {React.cloneElement(navLink.icon, { fontSize: "large" })} {/* Simge boyutunu artırdık */}
              <span style={{ marginLeft: "8px" }}>{navLink.name}</span>
            </Link>
          ))}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
