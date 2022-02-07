import React from 'react';
import Tobacco from './Tobacco';
import { Grid } from '@mui/material';

export default function TobaccoList(props) {
  return (
    <Grid 
      container
      spacing={{ xs: 2, md: 3 }} 
      columns={{ xs: 4, sm: 8, md: 12 }}
      justifyContent='center'
      style={{ flexGrow: '1'}}
      marginTop="1em !important"
    >           
      {
        props.tobaccos.map((tobacco) => {
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
