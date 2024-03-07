import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';

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
          backgroundImage: 'url("https://i.pinimg.com/564x/4f/d4/97/4fd4972cb3cf77fda159e722cf1fc6ac.jpg")', 
          backgroundSize: 'cover',
          minHeight: '1000px',
        },
      },
    },
  },
});

export default function ProjectTable() {
  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [responseM, setRm] = useState([]);
  const [showNameSearch, setShowNameSearch] = useState(false);
  const [showDateSearch, setShowDateSearch] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [sortBy, setSortBy] = useState(null); 
  const [sortDirection, setSortDirection] = useState('asc'); 
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  const handleSaveProjectName = () => {
    const data = {
      pId: selectedProjectId,
      pName: projectName,
    };

    axios
      .post('http://127.0.0.1:5000/editProject', data)
      .then(function (response) {
        setRm(response.data.message);
        alert(response.data.message);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data.message);
      });

    const updatedProjects = items.map((project) => {
      if (project.id === selectedProjectId) {
        return { ...project, project_name: projectName };
      }
      return project;
    });
    setItems(updatedProjects);
    setFilteredProjects(updatedProjects);
    handleCloseDialog();
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/getProject', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data, typeof data);

      if (data && typeof data === 'object') {
       
        const formattedData = Object.values(data).map((item, index) => ({
          id: index + 1,
          ...item,
          project_date: new Date(item.project_date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }),
        }));
        setItems(formattedData);
        console.log('setitems', items);
        console.log('setitems', items, typeof items);
      } else {
        console.error('Error: Invalid data structure');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchName,searchDate]);


  useEffect(() => {
    fetchData();
  }, [responseM]);

  const handleSearch = () => {
    let filteredProjects = [...items];
    console.log("search",searchName)
    if (showNameSearch) {
      filteredProjects = filteredProjects.filter(project =>
        project.project_name.toLowerCase().includes(searchName.toLowerCase())
      );
    } else if (showDateSearch) {
      filteredProjects = filteredProjects.filter(project =>
        project.project_date.toLowerCase().includes(searchDate.toLowerCase())
      );
    }
    setFilteredProjects(filteredProjects);
  };

  const handleSort = (sortByValue) => {
    
    if (sortBy === sortByValue) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortByValue);
      setSortDirection('asc'); 
    }
  };
  
  useEffect(() => {
    if (sortBy) {
      const sortedProjects = [...filteredProjects].sort((a, b) => {
        if (sortBy === 'name') {
          return sortDirection === 'asc' ? a.project_name.localeCompare(b.project_name) : b.project_name.localeCompare(a.project_name);
        } else if (sortBy === 'date') {
          return sortDirection === 'asc' ? new Date(a.project_date) - new Date(b.project_date) : new Date(b.project_date) - new Date(a.project_date);
        }
      });
      setFilteredProjects(sortedProjects);
    }
  }, [sortBy, sortDirection, filteredProjects]);
  
  const handleDelete = (id) => {
    const data = {
      delId: id,
    };

    axios
      .post('http://127.0.0.1:5000/deleteProject', data)
      .then(function (response) {
        setRm(response.data.message);
        alert(response.data.message);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data.message);
      });
  };

  const handleEdit = (id) => {
    setSelectedProjectId(id);
    setDialogOpen(true);
  };

  const handleSearchByName = () => {
    setShowNameSearch(!showNameSearch);
    if (showDateSearch) setShowDateSearch(false);
  };

  const handleSearchByDate = () => {
    setShowDateSearch(!showDateSearch);
    if (showNameSearch) setShowNameSearch(false);
  };

  const buttonText = sortBy ? `Sort by ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} (${sortDirection === 'asc' ? 'Asc' : 'Desc'})` : 'Sort';



  return (
    <ThemeProvider theme={customTheme}>
      <div style={{ textAlign: 'center' }}>
        <Box sx={{ pt: 4, pb: 2 , pr: 38}} >
          <Button variant="outlined" color="primary" onClick={handleSearchByName}>Search by Name</Button>{' '}
          <Button variant="outlined" color="primary" onClick={handleSearchByDate}>Search by Date</Button>{' '}
          <Button variant="outlined" color="primary" onClick={() => handleSort(sortBy === 'name' ? 'date' : 'name')}>{buttonText}</Button>
        </Box>

        {showNameSearch && (
          <TextField
            autoFocus
            margin="dense"
            id="searchByName"
            label="Search by Name"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onBlur={handleSearch}
          />
        )}

        {showDateSearch && (
          <TextField
            autoFocus
            margin="dense"
            id="searchByDate"
            label="Search by Date"
            type="text"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            onBlur={handleSearch}
          />
        )}

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
      {(rowsPerPage > 0
        ? filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : filteredProjects
      ).map((info) => (
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
<Box sx={{ width: '50%', margin: 'auto', marginTop: '20px' }}>
  <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={filteredProjects.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={(event, newPage) => setPage(newPage)}
    onRowsPerPageChange={(event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }}
  />
</Box>

      </div>
    </ThemeProvider>
  );
}