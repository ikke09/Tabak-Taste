import React from 'react';
import { Grid, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/system';

const StyledFooter = styled(Grid)({
    margin: '0.5em 0',
    color: 'white',
});

const IconStyles = {
    verticalAlign: 'text-bottom'
};

const Footer = () => {
    return (
        <StyledFooter container alignItems='center' justifyContent='center'>
            <Grid item paddingX='2px'>
                Created with <FavoriteIcon fontSize="small" style={IconStyles} />
            </Grid>
            <Grid item paddingX='2px'>
                by {process.env.REACT_APP_AUTHOR}
            </Grid>
            <Grid item paddingX='2px'>
                - Code hosted on <Link href={process.env.REACT_APP_REPO_LINK} underline="none" target="_blank" rel="noopener"><GitHubIcon fontSize="small" style={IconStyles}/></Link>
            </Grid>
        </StyledFooter>
    )
};

export default Footer;
