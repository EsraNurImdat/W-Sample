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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';


import axios  from 'axios';

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(items);
  const [responseM, setRm] = useState([]);
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveProjectName = () => {
    const data = {
      pId: selectedProjectId,
      pName: projectName,
    };
    console.log("pname ",selectedProjectId,projectName)
    axios.post('http://127.0.0.1:5000/editProject',data)
    .then(function (response) {
      console.log(response);
      setRm(response.data.message)
      alert(response.data.message)
    })
    .catch(function (error) {
      console.log(error.response.data);
      alert(error.response.data.message)
    });

    const updatedProjects = items.map(project => {
      if (project.pid === selectedProjectId) {
        return { ...project, name: projectName };
      }
      return project;
    });
    setItems(updatedProjects);
    setFilteredProjects(updatedProjects);
    handleCloseDialog();
  };

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
          // Format the project_date to mm/dd/yyyy
          const formattedData = Object.values(data).map(item => ({
            ...item,
            project_date: new Date(item.project_date).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric'
            })
          }));
          setItems(formattedData);
          console.log("setitems", items);
          console.log("setitems", items,typeof items);
        } else {
          console.error("Error: Invalid data structure");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
  React.useEffect(() => {
    

   
    
    fetchData();
    
  
    // add dependencies to control when this effect runs
  }, []); 

   const handleDelete = (id) => {
    const data = {
      delId: id,
    };
    console.log("delete id",id)
    axios.post('http://127.0.0.1:5000/deleteProject',data)
    .then(function (response) {
      console.log(response);
      setRm(response.data.message)
      alert(response.data.message)
    })
    .catch(function (error) {
      console.log(error.response.data);
      alert(error.response.data.message)
    });

    console.log(`Delete clicked for project with id: ${id}`);
    
  };
  React.useEffect(() => {
    fetchData();
  }, [responseM]);
 

  
 
 

  const handleEdit = (id) => {
    setSelectedProjectId(id);
    setDialogOpen(true);
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
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((info) => (
                <TableRow key={info.pid}>
                  <TableCell>{info.project_name}</TableCell>
                  <TableCell>{info.project_date}</TableCell>
                  <TableCell>
                    <Button size="small" variant="contained" color="error" onClick={() => handleDelete(info.pid)}>Delete</Button>{' '}
                    <Button size="small" variant="contained" color="primary" onClick={() => handleEdit(info.pid)}>Edit</Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="projectName"
              label="Project Name"
              type="text"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveProjectName}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>

  );
}



