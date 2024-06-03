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
import { TablePagination, Grid, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import DialogContentText from '@mui/material/DialogContentText';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SortIcon from '@mui/icons-material/Sort';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { CSVLink } from 'react-csv';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Tooltip,
  IconButton,
  Popover,
} from '@mui/material';

const customTheme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    darker: blue[900],
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
  const [showNameSearch, setShowNameSearch] = useState(false);
  const [showDateSearch, setShowDateSearch] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [projectDetailsDialogOpen, setProjectDetailsDialogOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [showNoProjectMessage, setShowNoProjectMessage] = useState(false);



  const username = localStorage.getItem('username');
  const userdata = {
    username: username
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    setSelectedProjectId(id);
    setDeleteDialogOpen(true);
  };

  const handleGetProjectDetails = async (projectId) => {
    try {
      const data = { projectId };
      const response = await axios.post('http://127.0.0.1:5000/getProjectDetails', data);
      const { links } = response.data;

      // Set project details
      setProjectDetails(links);
      setProjectDetailsDialogOpen(true);
    } catch (error) {
      console.error('Error getting project details:', error);
    }
  };

  const csvData = projectDetails.map(url => [url]);

  const handleDeleteConfirmation = () => {
    setLoading(true);
    const data = {
      delId: selectedProjectId,
    };
  
    axios
      .post('http://127.0.0.1:5000/deleteProject', data)
      .then(function (response) {
        fetchData();
        setSuccessMessage('Project successfully deleted');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); // 5000 milliseconds = 5 seconds
        setErrorMessage('');
      })
      .catch(function (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000); // 5000 milliseconds = 5 seconds
        setSuccessMessage('');
      });
  
    setDeleteDialogOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/getProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      });

      const data = await response.json();

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
        setFilteredProjects(formattedData); 
      } else {
        console.error('Error: Invalid data structure');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    handleSearch();
  }, [searchName, searchDate]);

  useEffect(() => {
    if (sortBy) {
      const sortedProjects = [...filteredProjects].sort((a, b) => {
        if (sortBy === 'name') {
          return sortDirection === 'asc' ? a.project_name.localeCompare(b.project_name) : b.project_name.localeCompare(a.project_name);
        } else if (sortBy === 'date') {
          return sortDirection === 'dsc' ? new Date(a.project_date) - new Date(b.project_date) : new Date(b.project_date) - new Date(a.project_date);
        }
      });
      setFilteredProjects(sortedProjects);
    }
  }, [sortBy, sortDirection, filteredProjects]);

  const handleShowNameSearch = () => {
    setShowNameSearch(!showNameSearch);
    setShowDateSearch(false);
    setSearchDate('');
    setSearchName('');
  };
  
  const handleShowDateSearch = () => {
    setShowDateSearch(!showDateSearch);
    setShowNameSearch(false);
    setSearchName('');
    setSearchDate('');
  };
  

  const handleSearch = () => {
    let filteredProjects = [...items];

    filteredProjects = filteredProjects.filter(project => {
      if (showNameSearch && searchName) {
        return project.project_name.toLowerCase().includes(searchName.toLowerCase());
      } else if (showDateSearch && searchDate) {
        return project.project_date.toLowerCase().includes(searchDate.toLowerCase());
      }
      return true;
    });

    setFilteredProjects(filteredProjects);
    setPage(0);
    setRowsPerPage(5);
   
  };

  const handleSort = (sortByValue) => {
    if (sortBy === sortByValue) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortByValue);
      setSortDirection('asc');
    }
  };

  const buttonText = sortBy ? `Sorted by ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}` : 'Sort';

  const handleSaveProjectName = () => {
    setLoading(true);
    const data = {
      pId: selectedProjectId,
      pName: projectName,
    };
  
    axios
      .post('http://127.0.0.1:5000/editProject', data)
      .then(function (response) {
        const updatedItems = items.map(item => {
          if (item.id === selectedProjectId) {
            return { ...item, project_name: projectName };
          }
          return item;
        });
        setItems(updatedItems);
        fetchData();
        setSuccessMessage('Project successfully edited');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); // 5000 milliseconds = 5 seconds
        setErrorMessage('');
      })
      .catch(function (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000); // 5000 milliseconds = 5 seconds
        setSuccessMessage('');
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
      });
  };

  useEffect(() => {
    if (filteredProjects.length === 0 && !loading) {
      const timeout = setTimeout(() => {
        setShowNoProjectMessage(false);
      }, 5000); // 5000 milliseconds = 5 seconds
  
      return () => clearTimeout(timeout);
    }
  }, [filteredProjects, loading]);



  const [anchorEl, setAnchorEl] = useState(null);

  const handleInfoIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ textAlign: 'center' }}>
      <Box mt={2} mb={2}>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} md={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleShowNameSearch}
                  startIcon={<SearchIcon />}
                >
                  Search by Name
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleShowDateSearch}
                  startIcon={<DateRangeIcon />}
                >
                  Search by Date
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSort(sortBy === 'name' ? 'date' : 'name')}
                  startIcon={<SortIcon />}
                >
                  {buttonText}
                </Button>
              </Grid>
            </Grid>
      </Box>

        <Box>
          {showNameSearch && (
            <TextField
              autoFocus
              margin="dense"
              id="searchByName"
              label="Search by Name"
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)} // onChange olayını kullanarak arama yap
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
              onChange={(e) => setSearchDate(e.target.value)} // onChange olayını kullanarak arama yap
            />
          )}


        </Box>

        {(filteredProjects.length === 0 && !loading) && (
           <Box
           sx={{
             width: '50%',
             margin: 'auto',
             textAlign: 'center',
             mt: 2,
           }}
         >
           <Alert severity="warning">NO PROJECT AVAILABLE!!</Alert>
         </Box>
       
        )}

<TableContainer component={Paper} sx={{ width: '60%', maxWidth: '80%', margin: 'auto', mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Project Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Project Date</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Project Main Url</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                Project Sampling Technique
                <Tooltip title="Explanation of sampling technique">
                  <IconButton size="small" onClick={handleInfoIconClick}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
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
                <TableCell>{info.mainurl}</TableCell>
                <TableCell>{info.technique}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(info.pid)}
                    style={{ backgroundColor: '#000080' }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>{' '}
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => { setSelectedProjectId(info.pid); setDialogOpen(true); }}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleGetProjectDetails(info.pid)}
                    startIcon={<InfoIcon />}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: 16 }}>
          <p>
            (a) the home, login, sitemap, contact, help and legal information pages,
            </p>
            <br></br>
            <p>
              (d) examples of pages having a substantially distinct appearance or presenting a different type of content,
            </p>
            <br></br>
           <p>
            (g) randomly selected pages amounting to at least 10 % of the crawl 
           </p>
            
        </div>
      </Popover>

        {loading && (
          <Box mt={2}>
            <CircularProgress />
          </Box>
        )}

        {successMessage && (
          <Box
            sx={{
              width: '50%',
              margin: 'auto',
              textAlign: 'center',
              mt: 2,
            }}
          >
            <Alert severity="success">{successMessage}</Alert>
          </Box>
        )}

        {errorMessage && (
          <Box
            sx={{
              width: '50%',
              margin: 'auto',
              textAlign: 'center',
              mt: 2,
            }}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}

        <Box sx={{ width: '100%', maxWidth: '80%', margin: 'auto', mt: 4 }}>
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

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Edit Project Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="editProjectName"
              label="Project Name"
              type="text"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}  variant="contained" size="small" startIcon={<CancelIcon />}>Cancel</Button>
            <Button onClick={handleSaveProjectName} variant="contained" size="small" startIcon={<SaveIcon />} >Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Are you sure you want to delete this project?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action cannot be undone. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} variant="contained" size="small"startIcon={<CancelIcon />} >Cancel</Button>
            <Button onClick={handleDeleteConfirmation} variant="contained" size="small" startIcon={<DeleteIcon />}>Delete</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={projectDetailsDialogOpen} onClose={() => setProjectDetailsDialogOpen(false)}>
          <DialogTitle>Project Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {projectDetails.map((link, index) => (
                <div key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </div>
              ))}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProjectDetailsDialogOpen(false)} variant="contained" size="small" startIcon={<CancelIcon />} >Close</Button>
            <CSVLink data={csvData} filename={'urls.csv'}>
              <Button variant="contained" size="small" startIcon={<DownloadIcon />}>
                Download CSV
              </Button>
            </CSVLink>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
