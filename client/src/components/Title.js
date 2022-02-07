import React from 'react';
import { styled } from '@mui/system';

const StyledTitle = styled('h1')(({ theme }) => ({
    color: theme.palette.primary.title,
    WebkitTextStroke: `0.05em black`,
    textStroke: `0.05em black`,
    fontSize: '4em',
    textAlign: 'center',
  }));

export default function Title() {
  return (
    <StyledTitle>
        Tabak Taste
    </StyledTitle>);
}
