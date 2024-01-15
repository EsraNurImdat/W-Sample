import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link component
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const DirectToPage = ({}) =>{
  return(
    <div      style={{
      position: "absolute",
      marginTop: -200,
      display: "flex",
      justifyContent: "space-between",
      width: "10%",
    }} >
        <Link  to="/login" >Sign In</Link>
        
        <Link to="/register">
          Sign Up
        </Link>
      </div>

  )

};

const Search = ({ searchQuery, setSearchQuery, technique }) => {
  const handleSearch = () => {
    console.log("Search:", searchQuery);
    console.log("Technique:", technique);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Use space-between to push items to opposite sides
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
      <IconButton type="button" aria-label="search" onClick={handleSearch}>
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </div>
  );
};

export default function SearchB() {
  const [searchQuery, setSearchQuery] = useState("");
  const [technique, setTechnique] = useState("");
  const handleChange = (event) => {
    setTechnique(event.target.value);
  };

  return (
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
      <DirectToPage/>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        technique={technique}
      />
      <br></br>
      <FormControl sx={{ minWidth: 420, marginRight: 7 }}>
        <InputLabel>Select Sampling Technique</InputLabel>
        <Select
          labelId="tech"
          id="tech"
          label="Select Sampling Technique"
          onChange={handleChange}
        >
          <MenuItem value={"a"}>a</MenuItem>
          <MenuItem value={"c"}>c</MenuItem>
          <MenuItem value={"d"}>d</MenuItem>
          <MenuItem value={"g"}>g</MenuItem>
        </Select>
      </FormControl>
      <div style={{ padding: 3 }}></div>
    </div>
  );
}

