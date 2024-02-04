import { Alert, Box, Snackbar, Typography } from '@mui/material';
import SearchProgress from './SearchProgress';
import TobaccoList from './TobaccoList';
import { UseAsyncReturn } from 'react-async-hook';
import { ApiResult } from '@tabak-taste/types';

type ResultProps = {
  response: UseAsyncReturn<ApiResult, [input: string]>;
};

const Result = ({ response }: ResultProps) => {
  return (
    <Box>
      {response.loading && <SearchProgress />}
      {(response.error || (response.result && response.result.error)) && (
        <Snackbar open={true} autoHideDuration={500}>
          <Alert severity="error">{response.result!.error.message}</Alert>
        </Snackbar>
      )}
      {!response.error &&
        (!response.result ||
          !response.result.data ||
          response.result.data.length === 0) && (
          <Typography color="primary.contrastText" mt="1em">
            Suche ergab keinen Treffer
          </Typography>
        )}
      {!response.error && response.result && response.result.data && (
        <TobaccoList tobaccos={response.result.data} />
      )}
    </Box>
  );
};

export default Result;
