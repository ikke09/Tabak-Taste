import React from 'react';
import { Grid, Paper, Divider, Chip } from '@mui/material';

const Tobacco = (props) => {
    return (
        <Paper variant="elevation" elevation={3} style={{flexGrow: "1", backgroundColor: '#D3DAEE'}}>
            <Grid 
                container 
                alignItems="flex-start"
                justifyContent="space-between"
                direction="column"
            >
                <Grid item>
                    <h3>
                        {props.model.name}
                    </h3>
                    <h5>
                        {props.model.producer.name}
                    </h5>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid 
                    container 
                    item 
                    alignItems="center"
                    justifyContent="space-around"
                    direction="row"
                >
                    { 
                        props.model.tastes.map((taste, index) => {
                            return (
                                <Grid item key={index}>
                                    <Chip
                                        label={taste}
                                        color="secondary"
                                    />
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Grid>
        </Paper>
    )
};

export default Tobacco;