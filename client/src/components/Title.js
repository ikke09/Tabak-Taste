import React from 'react';
import { styled } from '@mui/system';

const StyledTitle = styled('h1')(({ theme }) => ({
    color: theme.palette.primary.main,
    "-webkit-text-stroke": `4px ${theme.palette.primary.black}`,
    "text-stroke": `4px ${theme.palette.primary.black}`,
  }));

export default function Title() {
  return (
    <StyledTitle>
        Tabak Taste
    </StyledTitle>);
}
