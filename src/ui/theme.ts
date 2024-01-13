import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffc500',
    },
    secondary: {
      main: '#ffc500',
    },
    background: {
      paper: '#000000',
      default: '#5e5e5e',
    },
    text: {
      primary: '#ffc500',
      secondary: '#ffff8d',
    },
    divider: '#ffc500',
  },
});
