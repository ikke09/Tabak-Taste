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
      main: '#FFFFFF',
      title: '#FE00DD',
      background: '#6078C3',
      card: '#D8E9DC',
      highlight: '#29E7CD'
    },
  },
});

function App() {

  const baseApiUrl = '/api/tobaccos';
  const [query, setQuery] = useState("");
  const [alltobaccos, setAllTobaccos] = useState([]);
  const [tobaccos, setTobaccos] = useState(alltobaccos);

  useEffect(() => {
    fetch(baseApiUrl)
      .then(res => res.json())
      .then(data => setAllTobaccos(data));
  }, []);

  useEffect(() => {
    if(query) {
      const queryRegEx = new RegExp(query, 'gi')
      setTobaccos(
        alltobaccos.filter(tobacco => queryRegEx.test(tobacco.name))
      );
    }
  }, [query, alltobaccos])
  
  return (
    <ThemeProvider theme={themeOptions}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'primary.background',
        }} 
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="nowrap"
          style={{ minHeight: '100vh', maxWidth: '80%', marginLeft: '10%' }}
        >
          <Grid item xs={8}>
            <Title />
          </Grid>
          <Grid 
            item
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ flexGrow: '1'}}
          >
            <Search data={query} handleChange={(event) => setQuery(event.target.value.trim())} />
          </Grid>
          {
            (tobaccos && tobaccos.length > 0)
            && <TobaccoList tobaccos={tobaccos} />
          }
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
