import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';
import Tobacco from './components/Tobacco';

function App() {

  const baseApiUrl = '/api/tobaccos';
  const [query, setQuery] = useState("");
  const [tobaccos, setTobaccos] = useState([]);

  useEffect(() => {
    if(!query || query === "") return;

    const requestUrl = `${baseApiUrl}?name=${query}`;
    console.log(requestUrl);
    fetch(requestUrl)
      .then(res => res.json())
      .then(data => setTobaccos(data));
  }, [query]);
  
  return (
    <Box
    sx={{
      width: '80vw',
      height: '90vh',
      alignItems: 'center',
      backgroundColor: 'primary.dark',
      '&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      },
    }} >
    <TextField
        fullWidth
        id="input-query"
        label="Suche nach dem gewünschten Tabak"
        helperText="Tabakname"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={query}
        onChange={changeEvent => setQuery(changeEvent.target.value)}
      />
      {
        tobaccos && tobaccos.length > 0
        ? tobaccos.map(tobacco => <Tobacco key={tobacco._id} model={tobacco} />)
        : <p>No Data loaded yet!</p>
      }
  </Box>
  );
}

export default App;
