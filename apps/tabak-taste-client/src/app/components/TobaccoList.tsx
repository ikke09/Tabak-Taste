import Tobacco from './Tobacco';
import { Grid, Typography } from '@mui/material';
import { TobaccoDTO } from '@tabak-taste/types';

type TobaccoListProps = {
  tobaccos: TobaccoDTO[];
};

const TobaccoList = ({ tobaccos }: TobaccoListProps) => {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 2, sm: 2, md: 2 }}
      columns={{ xs: 2, sm: 8, md: 12 }}
      justifyContent="center"
      style={{ flexGrow: '1' }}
      marginTop="1em !important">
      {tobaccos.length === 0 && (
        <Typography variant="body1" color="primary">
          Die Suche lieferte keine Ergebnisse...
        </Typography>
      )}
      {tobaccos.length > 0 &&
        tobaccos.map((tobacco) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={tobacco.id}>
              <Tobacco model={tobacco} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default TobaccoList;
