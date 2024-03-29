import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(94, 83, 120)',
      contrastText: "#fff"
    },
    secondary: {
      main: '#058665',
      contrastText: "#fff"
    },
  },
  typography: {
    fontFamily: 'system-ui',
    fontSize: 15,
    body1: {
      fontSize: '15px'
    },
    h2: {
      fontSize: 42,
      color: 'white',
      fontFamily: 'system-ui',
      fontWeight: 'bold'
    },
    h3: {
      letterSpacing: '1px',
      fontFamily: 'astrospace',
      fontSize: 33
    },
    h4: {
      letterSpacing: '1px',
      fontFamily: 'astrospace',
      fontSize: 25
    },
    h5: {
      fontSize: 16,
      color: 'white',
      fontFamily: 'system-ui',
      fontWeight: '500'
    },
    h6: {
      fontSize: 15,
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'astrospace',
      letterSpacing: '1px'
    },
    subtitle1: {
      fontSize: 13,
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'astrospace',
    },
    subtitle2: {
      fontSize: 15,
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 'none'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(40, 25, 77, 1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'system-ui',
          color: 'white'
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        valueLabel: {
          fontSize: '11px'
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          border: ''
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: '10px'
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: 'mediumpurple'
        }
      }
    },
  },
})
