import { Alert, Box, Snackbar, Typography } from "@mui/material";
import ResultProps from "../types/ResultProps";
import SearchProgress from "./SearchProgress";
import TobaccoList from "./TobaccoList";

const Result = ({ result }: ResultProps) => {
  return (
    <Box>
      {result.loading && <SearchProgress />}
      {result.result && result.result.error && (
        <Snackbar open={true} autoHideDuration={500}>
          <Alert severity="error">{result.result.error}</Alert>
        </Snackbar>
      )}
      {result.result &&
        !result.result.error &&
        result.result.data.length === 0 && (
          <Typography color="primary.contrastText" mt="1em">
            Suche ergab keinen Treffer
          </Typography>
        )}
      {result.result &&
        !result.result.error &&
        result.result.data.length > 0 && (
          <TobaccoList tobaccos={result.result.data} />
        )}
    </Box>
  );
};

export default Result;
