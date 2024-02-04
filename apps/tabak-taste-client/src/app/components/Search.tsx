import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/system';
import { ChangeEvent } from 'react';

type SearchProps = {
  data: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
};

const StyledInput = styled(TextField)(({ theme }) => ({
  boxShadow: `-0.1rem -0.1rem 0.6rem 0.1rem ${theme.palette.warning.main}, 0.1rem 0.1rem 0.6rem 0.1rem ${theme.palette.warning.main}`,
  border: `0.15rem solid black`,
  borderRadius: '0.75rem',
  width: '40vw',
  minWidth: '300px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& input': {
    fontSize: 'large',
    color: `${theme.palette.info.main}`,
  },
}));

const ColoredSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: `${theme.palette.info.main}`,
}));

const ColoredCancelIcon = styled(CancelIcon)(({ theme }) => ({
  color: `${theme.palette.info.main}`,
}));

const Search = ({ data, handleChange, handleClear }: SearchProps) => {
  return (
    <StyledInput
      id="input-query"
      variant="outlined"
      margin="normal"
      autoComplete="off"
      value={data}
      onChange={handleChange}
      placeholder="Search for Tobacco name"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ColoredSearchIcon />
          </InputAdornment>
        ),
        endAdornment: data && (
          <IconButton aria-label="Clear input" onClick={handleClear}>
            <ColoredCancelIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default Search;
