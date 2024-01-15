import React from 'react';
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

//unreg user'ın işlem bittikten sonra karşılaşacağı screen. save project buttonu yok sadece download var.
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

export default function ResultTable2() {
  const resultInformation = [
    { label: 'Result 1 ', value: "Link 1" },
    { label: 'Result 2 ', value: "Link 2" },
    { label: 'Result 3', value: "Link 3" },
    { label: 'Result 4 ', value: "Link 4" },
    { label: 'Result 5 ', value: "Link 5" },
    { label: 'Result 6', value: "Link 6" },
  
  ];

  return (
      <ThemeProvider theme={customTheme}>
    
        <div style={{ textAlign: 'center' }}>
          
          <Box sx={{ pt: 4, pb: 6 }}>
            <Container maxWidth="md">
              <Typography style={{ marginBottom: '-8rem' }} component="h2" variant="h3" align="center" color="#00897b" gutterBottom>
                Result
              </Typography>
            </Container>
          </Box>
          <TableContainer component={Paper} style={{ width: '50%', margin: 'auto', marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Page Label</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Page Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultInformation.map((info) => (
                  <TableRow key={info.label}>
                    <TableCell>{info.label}</TableCell>
                    <TableCell>{info.value}</TableCell>
     
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <br></br> 
        <Button variant="contained"  size="small" >
                        Download Project
        </Button>
        </div>
        
      </ThemeProvider>
    
  );
}

