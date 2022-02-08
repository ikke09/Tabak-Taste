import React from 'react';
import Tobacco from './Tobacco';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function TobaccoList({tobaccos}) {
  return (
    <Grid 
      container
      spacing={{ xs: 1, md: 2 }} 
      columns={{ xs: 2, sm: 8, md: 12 }}
      justifyContent='center'
      style={{ flexGrow: '1'}}
      marginTop="1em !important"
    > 
      { tobaccos.length === 0
        && <Typography variant='body1' color='primary'>Die Suche lieferte keine Ergebnisse...</Typography>}    
      {
        tobaccos.length > 0 &&
        tobaccos.map((tobacco) => {
          return (
            <Grid 
              item 
              xs={2}
              sm={4}
              md={4}
              key={tobacco._id}
            >
                <Tobacco model={tobacco} />
            </Grid>)
        })
      }
    </Grid>
  );
}

TobaccoList.propTypes = {
  tobaccos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TobaccoList;