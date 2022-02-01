import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search(props) {
  return (
    <TextField
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
