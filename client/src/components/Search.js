import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const StyledInput = styled(TextField)(({ theme }) => ({
    boxShadow: `-0.1em -0.1em 0.6em 0.1em ${theme.palette.primary.highlight}, 0.1em 0.1em 0.6em 0.1em ${theme.palette.primary.highlight}`,
    color: 'black',
    border: `0.15em solid black`,
    borderRadius: '0.75em',
    width: '25%'
}));

export default function Search(props) {
  return (
    <StyledInput
        id="input-query"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
        variant="outlined"
        value={props.data}
        onChange={props.handleChange}
    />
  );
}
