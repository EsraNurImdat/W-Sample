/*import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { blue } from '@mui/material/colors';
import {useNavigate} from "react-router-dom";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';




const customTheme = createTheme({
 palette: {
    contrastThreshold: 4.5,
    darker: blue[900],
 
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          //backgroundImage: 'url("./assets/logo.jpg")',
          backgroundSize: 'cover',
          minHeight: '1000px',
        },
      },
    },
  },
});

const Search = ({ setSearchQuery}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
        style={{ flex: 1, marginRight: 10, minWidth: 820 }}
      />
    </div>
  );
};
//SearchBA: bu sayfanın main fonksiyonudur.
//bu fonksiyonu dışarı export edilen fonksiyonudur, yani diğer sayfalardan bu fonksiyona ulaşılabilir.
export default function SearchBA() {
  const [searchQuery, setSearchQuery] = useState("");
  const [technique, setTechnique] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const steps = ['Enter URL', 'Select Sampling Technique', 'Crawl'];
 
  const handleSearch = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 2) {
      setActiveStep(2);
      const axios = require('axios');
      const data = {
        technique: technique,
        searchQuery: searchQuery,
      };
      setSearchQuery(searchQuery);
      if (isMainURL(searchQuery)) {
        setError(null);
        setStatus("waiting");
        fetch("http://127.0.0.1:5000/searchscreen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchQuery: searchQuery , technique: technique }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data) && data.length === 0) {
              setStatus("error")
              setError("Failed to crawl!")
          } else {
              if (data.hasOwnProperty("message")) {
                  setStatus("error");
                  setError(data.message)
              } else {
                  setStatus("done");
                  setActiveStep(3)
                  navigate('/resulttable2');
              } }
            
          })
          .catch((error) => {
            console.error("Error occurred:", error);
            setStatus("error");
            setError(error)
          });
      } else {
        setStatus("error")
        setError("Error: Not a main URL");
      }
    }
  };
 
  
  const isMainURL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname === "/" && parsedUrl.search === "";
    } catch (error) {
      // Check invalid URLs 
      return false;
    }
  };
   
   // sampling teknik set eder
  const handleChange = (event) => {
    setTechnique(event.target.value);
    setActiveStep(2);
  };
  
  const handleButtonClick = () => {
    handleSearch();
  };


  
  
  React.useEffect(() => {
      
  }, [status]);
 //themeprovider
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
         <div style={{ padding: 3 ,marginBlock:-100}}></div>
  <Stepper activeStep={activeStep}>
    {steps.map((label) => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>

        <div style={{ padding: 3 }}></div>
        <Search
         
          setSearchQuery={setSearchQuery}
          onChange={handleChange} //input'u algılar
          
        />
        <br></br>
        {activeStep === 1 && (
          <FormControl sx={{ minWidth: 420, marginRight: 7 }}>
            <InputLabel>Select Sampling Technique</InputLabel>
            <Select
              labelId="tech"
              id="tech" 
              label="Select Sampling Technique"
              value={technique}
              onChange={handleChange}
            > 
              <MenuItem value={"a"}>(a) the home, login, sitemap, contact, help and legal information pages</MenuItem> 
              <MenuItem value={"c"}>(c) the pages containing the accessibility statement or policy and the pages containing the feedback mechanism</MenuItem>
              <MenuItem value={"d"}>(d) examples of pages having a substantially distinct appearance or presenting a different type of content</MenuItem>
              <MenuItem value={"g"}>(g) randomly selected pages amounting to at least 10 % of the sample established by points (a) to (f)…</MenuItem>
            </Select>
          </FormControl>
        )}
        {activeStep === 2 &&  status != "waiting" && (
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 12,
              marginLeft: -6,
              ":hover": {
                bgcolor: "#004d40",
              },
            }}
            onClick={handleSearch}
          >
            Crawl
          </Button> 
        )}
         
<br></br>
        {status === "waiting" && <Box sx={{ width: '50%' }}> 
      <LinearProgress /> 
    </Box>  }
    {status === "done" && (
          <div>
            <Alert
              sx={{
                mt: -5,
                mb: 2,
                marginLeft: -6,
              }}
              severity="success"
            >
              Crawling completed!
            </Alert>

          </div>
        )}

{status === "error" && (
          <div>
            <Alert
              sx={{
                mt: -8,
                mb: 2,
                marginLeft: -6,
              }}
              severity="error"
            >
             {error}
            </Alert>

          </div>
        )}
       
      </div>
    </ThemeProvider>
  );
}

*/



/*
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { blue } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';


import Wlogo from "../assets/Wlogo.png";

// Tema oluşturma kısmı
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

// Search fonksiyonu
const Search = ({ setSearchQuery }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
        style={{ flex: 1, marginRight: 10, minWidth: 820 }}
      />
    </div>
  );
};

// SearchBA componenti
const SearchBA = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [technique, setTechnique] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const steps = ['Enter URL', 'Select Sampling Technique', 'Crawl and Create Samples'];

  const handleSearch = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 2) {
      setActiveStep(2);
      const axios = require('axios');
      const data = {
        technique: technique,
        searchQuery: searchQuery,
      };
      setSearchQuery(searchQuery);
      if (isMainURL(searchQuery)) {
        setError(null);
        setStatus("waiting");
        fetch("http://127.0.0.1:5000/searchscreen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchQuery: searchQuery , technique: technique }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data) && data.length === 0) {
              setStatus("error")
              setError("Failed to crawl!")
          } else {
              if (data.hasOwnProperty("message")) {
                  setStatus("error");
                  setError(data.message)
              } else {
                  setStatus("done");
                  setActiveStep(3)
                  navigate('/resulttable2');
              } }
            
          })
          .catch((error) => {
            console.error("Error occurred:", error);
            setStatus("error");
            setError(error)
          });
      } else {
        setStatus("error")
        setError("Error: Not a main URL");
      }
    }
  };

  const handleChange = (event) => {
    setTechnique(event.target.value);
    setActiveStep(2);
  };

  const handleButtonClick = () => {
    handleSearch();
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
        <div style={{ padding: 3, marginBlock: -100 }}></div>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div style={{ padding: 3 }}></div>
        <Search
          setSearchQuery={setSearchQuery}
          onChange={handleChange}
        />
        <br></br>
        {activeStep === 1 && (
          <FormControl sx={{ minWidth: 420, marginRight: 7 }}>
            <InputLabel>Select Sampling Technique</InputLabel>
            <Select
              labelId="tech"
              id="tech"
              label="Select Sampling Technique"
              value={technique}
              onChange={handleChange}
            >
              <MenuItem value={"a"}>(a) the home, login, sitemap, contact, help and legal information pages</MenuItem>
              <MenuItem value={"c"}>(c) the pages containing the accessibility statement or policy and the pages containing the feedback mechanism</MenuItem>
              <MenuItem value={"d"}>(d) examples of pages having a substantially distinct appearance or presenting a different type of content</MenuItem>
              <MenuItem value={"g"}>(g) randomly selected pages amounting to at least 10 % of the sample established by points (a) to (f)…</MenuItem>
            </Select>
          </FormControl>
        )}
        {activeStep === 2 && status !== "waiting" && (
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 12,
              marginLeft: -6,
              ":hover": {
                bgcolor: "#004d40",
              },
            }}
            onClick={handleSearch}
          >
            Crawl
          </Button>
        )}

        <br></br>
        {status === "waiting" && <Box sx={{ width: '50%' }}>
          <LinearProgress />
        </Box>}
        {status === "done" && (
          <div>
            <Alert
              sx={{
                mt: -5,
                mb: 2,
                marginLeft: -6,
              }}
              severity="success"
            >
              Crawling completed!
            </Alert>
          </div>
        )}

        {status === "error" && (
          <div>
            <Alert
              sx={{
                mt: -8,
                mb: 2,
                marginLeft: -6,
              }}
              severity="error"
            >
              {error}
            </Alert>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default SearchBA;
*/

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import axios from "axios";
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

// Tema oluşturma kısmı
const customTheme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    darker: blue[900],
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundSize: "cover",
          minHeight: "1000px",
        },
      },
    },
  },
});

// Search fonksiyonu
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

// SearchBA componenti
const SearchBA = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [technique, setTechnique] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const steps = ["Enter URL", "Select Sampling Technique", "Crawl and Create Samples"];

  const handleSearch = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 2) {
      setActiveStep(2);
      const axios = require("axios");
      const data = {
        technique: technique,
        searchQuery: searchQuery,
      };
      setSearchQuery(searchQuery);
      if (isMainURL(searchQuery)) {
        setError(null);
        setStatus("waiting");
        fetch("http://127.0.0.1:5000/searchscreen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchQuery: searchQuery, technique: technique }),
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
                navigate("/resulttable2");
              }
            }
          })
          .catch((error) => {
            console.error("Error occurred:", error);
            setStatus("error");
            setError(error);
          });
      } else {
        setStatus("error");
        setError("Error: Not a main URL");
      }
    }
  };

  const handleChange = (event) => {
    setTechnique(event.target.value);
    setActiveStep(2);
  };

  const handleButtonClick = () => {
    handleSearch();
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
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Search setSearchQuery={setSearchQuery} onChange={handleChange} />
        <br />
        {activeStep === 1 && (
          <FormControl sx={{ minWidth: "80%", maxWidth: "80%", marginBottom: 2 }}>
            <InputLabel>Select Sampling Technique</InputLabel>
            <Select
              labelId="tech"
              id="tech"
              label="Select Sampling Technique"
              value={technique}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={"a"}>
                (a) the home, login, sitemap, contact, help and legal information pages
              </MenuItem>
              <MenuItem value={"c"}>
                (c) the pages containing the accessibility statement or policy and the pages containing the feedback mechanism
              </MenuItem>
              <MenuItem value={"d"}>
                (d) examples of pages having a substantially distinct appearance or presenting a different type of content
              </MenuItem>
              <MenuItem value={"g"}>
                (g) randomly selected pages amounting to at least 10 % of the sample established by points (a) to (f)…
              </MenuItem>
            </Select>
          </FormControl>
        )}
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
};

export default SearchBA;