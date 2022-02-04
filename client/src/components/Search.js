import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/system';

const StyledInput = styled(TextField)(({ theme }) => ({
    boxShadow: `-0.1em -0.1em 0.6em 0.1em ${theme.palette.primary.highlight}, 0.1em 0.1em 0.6em 0.1em ${theme.palette.primary.highlight}`,
    border: `0.15em solid black`,
    borderRadius: '0.75em',
    width: '40%',
    minWidth: '300px',
    "& .MuiOutlinedInput-root": {
        "& fieldset": { 
            border: "none"
        },
        "&.Mui-focused fieldset": {
            border: "none"
        },
    },
    "& input": {
        fontSize: 'large',
        color: `${theme.palette.primary.card}`,
    }
}));

const ColoredSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: `${theme.palette.primary.card}`,
}));

const ColoredCancelIcon = styled(CancelIcon)(({ theme }) => ({
    color: `${theme.palette.primary.card}`,
}));

export default function Search(props) {
  return (
    <StyledInput
        id="input-query"
        variant="outlined"
        margin="normal"
        autoComplete="off"
        value={props.data}
        onChange={props.handleChange}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <ColoredSearchIcon />
                </InputAdornment>
            ),
            endAdornment: props.data && (
                <IconButton
                  aria-label="Eingabe löschen"
                  onClick={() => props.handleChange({target: {value: ""}})}
                >
                    <ColoredCancelIcon />
                </IconButton>
              )
        }}
        
    />
  );
}
