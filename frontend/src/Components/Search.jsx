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



import {useNavigate} from "react-router-dom";
//searchbar ve selection UI'nı oluşturur.
//bu sayfa component olarak kullanıldı. Home ve SearchScreen in içine importlandı. Home direk unreg user'ın interface'i. SearchScreen reg user 'ın interface'i.
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
 
  const navigate = useNavigate();
 
  const handleSearch = () => {
    
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
          console.log(data);
          setStatus("done");
          navigate('/resultscreen');
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          setStatus("error");
        });
    } else {
      setError("Error: Not a main URL");
    }
  };
 
     /*
      axios.post('http://127.0.0.1:5000/searchscreen', data)
      .then(function (response) {
        console.log(response.data);
        setDataRes(response.data)
        setStatus("done");
        //navigate('/resultscreen',response.data)
        navigate('/resultscreen', { state: { dataRes } });
      })
      .catch(function (error) {
        console.log(error.response);
        setStatus("error");
        alert(error.response.data.message)
      });
    } else {
      setError("Error: Not a main URL");
    }
  };
*/
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
        <div style={{ padding: 3 }}></div>
        <Search
         
          setSearchQuery={setSearchQuery}
          onChange={handleChange} //input'u algılar
          
        />
        {error && <div style={{ color: "red", marginTop: 5 }}>{error}</div>}
        <br></br>
        <FormControl sx={{ minWidth: 420, marginRight: 7 }}>
          <InputLabel>Select Sampling Technique</InputLabel>
          <Select
            labelId="tech"
            id="tech" 
            label="Select Sampling Technique"
            onChange={handleChange} //chosen sampling technique i algılayıp set eder. //menu item sampling techniqueleri user a sunar.
          > 
            <MenuItem value={"a"}>(a) the home, login, sitemap, contact, help and legal information pages</MenuItem> 
            <MenuItem value={"c"}>(c) the pages containing the accessibility statement or policy and the pages containing the feedback mechanism</MenuItem>
            <MenuItem value={"d"}>(d) examples of pages having a substantially distinct appearance or presenting a different type of content</MenuItem>
            <MenuItem value={"g"}>(g) randomly selected pages amounting to at least 10 % of the sample established by points (a) to (f)…</MenuItem>
          </Select>
  
        </FormControl>

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
          onClick={handleButtonClick} //search butonuna basıldıgında sample oluşturmaya başlar.
      
        >
          Search 
        </Button> 
        {status === "waiting" && <Box sx={{ width: '100%' }}> 
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
      </div>
    </ThemeProvider>
  );
}