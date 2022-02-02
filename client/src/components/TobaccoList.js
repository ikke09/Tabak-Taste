import React from 'react';
import Tobacco from './Tobacco';
import { Grid } from '@mui/material';

export default function TobaccoList(props) {
  return (
    <Grid 
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      style={{ flexGrow: '1'}}
    >           
      {
        props.tobaccos.map((tobacco) => {
          return (
            <Grid item xs={4} key={tobacco._id}>
              <Tobacco model={tobacco} />
            </Grid>)
        })
      }
    </Grid>
  );
}
