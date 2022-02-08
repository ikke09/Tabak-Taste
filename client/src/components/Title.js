import React from 'react';
import { styled } from '@mui/system';

const StyledTitle = styled('h1')(({ theme }) => ({
    color: theme.palette.primary.title,
    WebkitTextStroke: `0.05rem black`,
    textStroke: `0.05rem black`,
    fontSize: '4rem',
    textAlign: 'center',
  }));

export default function Title() {
  return (
    <StyledTitle>
        Tabak Taste
    </StyledTitle>);
}
