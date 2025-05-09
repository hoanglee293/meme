import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#15DFFD',
      light: '#63f9fe',
      dark: '#112D60',
    },
    secondary: {
      main: '#761BB3',
    },
    background: {
      default: '#000000',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#C0C0C0',
    },
  },
  typography: {
    fontFamily: 'Pretendard, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          padding: '6px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '24px',
          },
        },
      },
    },
  },
}); 