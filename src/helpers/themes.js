import { createMuiTheme } from '@material-ui/core/styles'

export const mainTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgb(69, 59, 93)',
    },
    secondary: {
      main: '#058665',
    }
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
      fontSize: 35,
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
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: 'rgba(70, 45, 130, 1)'
      }
    },
    MuiButton: {
      label: {
        fontFamily: 'system-ui',
        color: 'white'
      },
    },
    MuiSlider: {
      valueLabel: {
        fontSize: '11px'
      }
    },
    MuiDataGrid: {
      root: {
        borderRadius: '0',
        border: ''
      }
    },
    MuiDialog: {
      paper: {
        margin: '10px'
      }
    },
    MuiTabs: {
      indicator: {
        background: 'mediumpurple'
      }
    }
  },
})
