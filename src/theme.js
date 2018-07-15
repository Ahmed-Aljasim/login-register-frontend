import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#439889',
      main: teal['800'],
      // dark: '#003d33',
      dark: '#338a3e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#98ee99',
      main: green['400'],
      dark: '#338a3e',
      contrastText: '#000',
    },
  },
  status: {
    danger: 'orange',
  },
});

export default theme;