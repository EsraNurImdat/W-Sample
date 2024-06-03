import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { blue, green } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LinearProgress from '@mui/material/LinearProgress';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

const customTheme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    darker: blue[900],
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

const Search = ({ setSearchQuery }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 10,
      }}
    >
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter URL"
        variant="outlined"
        placeholder="Search..."
        size="large"
        fullWidth
        style={{ margin: "10px auto", minWidth: 200 }}
      />
    </div>
  );
};

export default function SearchBA() {
  const [searchQuery, setSearchQuery] = useState("");
  const [technique, setTechnique] = useState("");
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const steps = ['Enter URL', 'Select Sampling Technique', 'Crawl and Create Samples'];

  const handleSearch = () => {
    if (activeStep === 2) {
      const axios = require('axios');
      const data = { technique, searchQuery };
      if (isMainURL(searchQuery)) {
        setError(null);
        setStatus("waiting");
        fetch("http://127.0.0.1:5000/searchscreen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data) && data.length === 0) {
              setStatus("error");
              setError("Failed to crawl!");
            } else {
              if (data.hasOwnProperty("message")) {
                setStatus("error");
                setError(data.message);
              } else {
                setStatus("done");
                setActiveStep(3);
                navigate('/resultscreen');
              }
            }
          })
          .catch((error) => {
            console.error("Error occurred:", error);
            setStatus("error");
            setError(error.message);
          });
      } else {
        setStatus("error");
        setError("Error: Not a main URL");
      }
    }
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
    if (value) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  };

  const handleTechniqueChange = (event) => {
    setTechnique(event.target.value);
    if (event.target.value) {
      setActiveStep(2);
    }
  };

  const isMainURL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname === "/" && parsedUrl.search === "";
    } catch (error) {
      return false;
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "70vh",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  style: {
                    color: index < activeStep ? green[500] : blue[500],
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Search setSearchQuery={handleSearchQueryChange} />
        <br />

        <FormControl sx={{ minWidth: "80%", maxWidth: "80%", marginBottom: 2 }}>
          <InputLabel>Select Sampling Technique</InputLabel>
          <Select
            labelId="tech"
            id="tech"
            label="Select Sampling Technique"
            value={technique}
            onChange={handleTechniqueChange}
            fullWidth
          >
            <MenuItem value={"a"}>
              (a) the home, login, sitemap, contact, help and legal information pages
            </MenuItem>
            <MenuItem value={"d"}>
              (d) examples of pages having a substantially distinct appearance or presenting a different type of content
            </MenuItem>
            <MenuItem value={"g"}>
              (g) randomly selected pages amounting to at least 10 % of the crawl
            </MenuItem>
          </Select>
        </FormControl>

        {activeStep === 2 && status !== "waiting" && (
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSearch}
            startIcon={<ScreenSearchDesktopIcon />}
          >
            Create Samples
          </Button>
        )}

        {status === "waiting" && (
          <Box sx={{ width: "80%", mt: 2 }}>
            <LinearProgress />
          </Box>
        )}
        {status === "done" && (
          <Alert severity="success" sx={{ width: "80%", mt: 2 }}>
            Crawling completed!
          </Alert>
        )}

        {status === "error" && (
          <Alert severity="error" sx={{ width: "80%", mt: 2 }}>
            {error}
          </Alert>
        )}
      </div>
    </ThemeProvider>
  );
}
