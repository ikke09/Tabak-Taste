import React from 'react';
import Tobacco from './Tobacco';
import { Grid } from '@mui/material';

export default function TobaccoList(props) {
  return (
    <Grid 
      container
      spacing={3}
      justifyContent='center'
      style={{ flexGrow: '1'}}
    >           
      {
        props.tobaccos.map((tobacco) => {
          return (
            <Grid 
              item 
              lg={4}
              md={6}
              xs={12} 
              key={tobacco._id}
            >
                <Tobacco model={tobacco} />
            </Grid>)
        })
      }
    </Grid>
  );
}
