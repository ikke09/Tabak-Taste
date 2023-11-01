import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/system";
import SearchProps from "../types/SearchProps";

const StyledInput = styled(TextField)(({ theme }) => ({
  boxShadow: `-0.1rem -0.1rem 0.6rem 0.1rem ${theme.palette.warning}, 0.1rem 0.1rem 0.6rem 0.1rem ${theme.palette.primary.highlight}`,
  border: `0.15rem solid black`,
  borderRadius: "0.75rem",
  width: "40%",
  minWidth: "300px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& input": {
    fontSize: "large",
    color: `${theme.palette.info}`,
  },
}));

const ColoredSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: `${theme.palette.info}`,
}));

const ColoredCancelIcon = styled(CancelIcon)(({ theme }) => ({
  color: `${theme.palette.info}`,
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
      placeholder="Tabakname"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ColoredSearchIcon />
          </InputAdornment>
        ),
        endAdornment: data && (
          <IconButton aria-label="Eingabe löschen" onClick={handleClear}>
            <ColoredCancelIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default Search;
