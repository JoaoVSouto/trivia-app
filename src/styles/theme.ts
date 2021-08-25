import { createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: pink[500],
    },
    secondary: {
      main: '#0cca4a',
    },
  },
});
