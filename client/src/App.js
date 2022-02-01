import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import Title from './components/Title';
import Search from './components/Search';
import TobaccoList from './components/TobaccoList';


export const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4A1E9E',
      light: '#BB98FF',
    },
    secondary: {
      main: '#4CC9F0',
    },
    error: {
      main: '#4f000b',
    },
    warning: {
      main: '#ee8434',
    },
    success: {
      main: '#292e1e',
    },
    info: {
      main: '#aa8f66',
    },
    bg: {
      main: '#fafafa',
    }
  },
});

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
    <ThemeProvider theme={themeOptions}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'bg.main',
          alignContent: 'center',
        }} 
      >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Title />
        </Grid>
        <Grid item xs={3}>
          <Search data={query} handleChange={(event) => setQuery(event.target.value)} />
        </Grid>
        { 
          (tobaccos && tobaccos.length > 0)
          && <Grid item xs={3}>
            <TobaccoList tobaccos={tobaccos} />
          </Grid>
        }
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
