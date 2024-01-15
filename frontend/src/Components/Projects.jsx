import React ,{ useState } from 'react';
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

export default function ProjectTable() {
  const TableInformation = [
    { id: 1, label: 'Project 1', value: "12.20.2023" },
    { id: 2, label: 'Project 2', value: "12.20.2023" },
    { id: 3, label: 'Project 3', value: "12.20.2023" },
    { id: 4, label: 'Project 4', value: "12.20.2023" },
    { id: 5, label: 'Project 5', value: "12.20.2023" },
    { id: 6, label: 'Project 6', value: "12.20.2023" },
  ];
  const [items, setItems] = useState([]);
  const parseData = (data) => {
    return data.map(item => {
      const [id, url, date] = item.split(' '); // Splitting the string by space
      return {
        id,
        url,
        date,
      };
    });
  };
  
  React.useEffect(() => {
    

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/getProject", {
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
          console.log("setitems", items,typeof items);
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

  
 
  const handleDelete = (id) => {
     // yollanacak data direkt id
    console.log(`Delete clicked for project with id: ${id}`);
    
  };

  const handleEdit = (id) => {
 
    // yollanacak data direkt id
   
    console.log(`Edit clicked for project with id: ${id}`);
   
    
  };

  return (
    <ThemeProvider theme={customTheme}>

      <div style={{ textAlign: 'center' }}>

        <Box sx={{ pt: 4, pb: 6 }}>
          <Container maxWidth="md">
            <Typography style={{ marginBottom: '-8rem' }} component="h2" variant="h3" align="center" color="#00897b" gutterBottom>
              Projects
            </Typography>
          </Container>
        </Box>
        <TableContainer component={Paper} style={{ width: '50%', margin: 'auto', marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Project Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Project Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((info) => (
                <TableRow key={info.id}>
                  <TableCell>{info[1]}</TableCell>
                  <TableCell>{info[2]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>

  );
}

