import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { CSVLink } from 'react-csv';
import { blue } from '@mui/material/colors';
const customTheme = createTheme({
 palette: {
    contrastThreshold: 4.5,
    darker: blue[900],
 
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

export default function ResultTable(props) {
  const [items, setItems] = useState([]);
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const date = `${day}-${month}-${year}`;
  console.log(date) // 4-1-2024 yazar
  const [pName, setPname] = useState("");

  const handlePname= (event) =>{
    event.preventDefault();
    setPname(event.target.value)
    
  }

  React.useEffect(() => {
    console.log(pName);
  }, [pName]);

  const axios = require('axios');
  const handleSave= () =>{
    //const axios = require('axios');

    const data = {
      pName: pName,
      date: date,
      items: items
    };

    axios.post('http://localhost:5000/saveProject', data)
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message)
      });
  }
  
  React.useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getresults", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data, typeof data);

      if (data && typeof data === 'object') {
        const itemList = Object.values(data);
        setItems(itemList);
        console.log("setitems", items);
      } else {
        console.error("Error: Invalid data structure");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  fetchData(); 

  // add dependencies to control when this effect runs
}, []); 

        const csvData = items.map(url => [url]); 
  return (
      <ThemeProvider theme={customTheme}>
    
        <div style={{ textAlign: 'center' }}>
          
          <Box sx={{ pt: 4, pb: 6 }}>
            <Container maxWidth="md">
              <Typography style={{ marginBottom: '-8rem' }} component="h2" variant="h3" align="center" color="#01579b" gutterBottom>
                Result
              </Typography>
            </Container>
          </Box>
          <TableContainer component={Paper} style={{ width: '50%', margin: 'auto', marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Page Link</TableCell>
                </TableRow>
              </TableHead>
             
              <TableBody>
                {items.map((item,index) => (
                  <TableRow key={index}>
                    <TableCell>{item}</TableCell>
     
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <br></br>
          <TextField  
                  autoComplete="project-name"
                  name="projectName"
                  id="projectName"
                  label="Project Name"
                  autoFocus
                  onChange={handlePname}
                  />
        <br></br>
        <br></br>  
        <Button variant="contained"  size="small" onClick={handleSave} >
                        Save Project
        </Button> {''}
        <CSVLink data={csvData} filename={'urls.csv'}>
        <Button variant="contained" size="small">
          Download CSV
        </Button>
      </CSVLink>

        </div>
        
      </ThemeProvider>
    
  );
}

// You can implement handleDelete and handleEdit functions as needed
const handleDelete = (label) => {
  // Implement delete logic here
  
};

const handleEdit = (label) => {
  // Implement edit logic here
  
};