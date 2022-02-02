import React from 'react';
import { styled } from '@mui/system';

const StyledTitle = styled('h1')(({ theme }) => ({
    color: theme.palette.primary.main,
    WebkitTextStroke: `0.05em ${theme.palette.primary.black}`,
    textStroke: `0.05em ${theme.palette.primary.black}`,
    fontSize: '4em',
  }));

export default function Title() {
  return (
    <StyledTitle>
        Tabak Taste
    </StyledTitle>);
}
