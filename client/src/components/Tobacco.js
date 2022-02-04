import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { styled } from '@mui/system';

const TobaccoCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.primary.card,
    border: `1px solid black`,
}));

const TasteChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.primary.highlight,
}));

const Tobacco = ({ model, ...rest }) => {
    return (
        <TobaccoCard
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '50%',
                minHeight: '200px'
            }}
            {...rest}
        >
            <Box sx={{ flexGrow: 1 }} >
                <CardContent>
                    <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                        fontWeight='bold'
                    >
                        {model.name}
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h6"
                    >
                        {model.producer.name}
                    </Typography>
                </CardContent>
            </Box>
            <Divider color='black'/>
            <Box sx={{ p: 2 }}>
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: 'center' }}
            >
                { 
                    model.tastes.map((taste, index) => {
                        return (
                            <Grid
                                key={index}
                                item
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                }}
                            >
                                <TasteChip
                                    label={taste}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>
          </Box>
        </TobaccoCard>
      );
};

Tobacco.propTypes = {
    model: PropTypes.object.isRequired,
}

export default Tobacco;