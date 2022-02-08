import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.primary.main,
    marginTop: '1rem',
}));

export default function SearchProgress() {
  return (
    <Box sx={{ display: 'flex'}} style={{ flexGrow: '1'}}>
        <StyledProgress />
    </Box>
  );
}