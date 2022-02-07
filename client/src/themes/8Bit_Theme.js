import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#FFFFFF',
            title: '#FE00DD',
            background: '#6078C3',
            card: '#D8E9DC',
            highlight: '#29E7CD'
        },
    },
});

export default Theme;