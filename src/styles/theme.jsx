import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#32539a' : '#213966',
      },
      secondary: {
        main: '#58a645',
      },

      background: {
        default: mode === 'dark' ? grey[900] : '#f0f2f5',
        paper: mode === 'dark' ? '#333' : '#ffffff',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            ...(mode === 'dark' && {
              borderColor: 'var(--primary-10)', // Replace with your desired color
              color: 'var(--white)', // Replace with your desired color
            }),
          },
        },
      },
    },
  });
};

const useCustomTheme = (theme) => {
  return getTheme(theme);
};

export default useCustomTheme;
