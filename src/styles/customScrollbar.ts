import { createStyles } from '@material-ui/core/styles';

import { theme } from './theme';

export const customScrollbar = createStyles({
  scrollbar: {
    '&::-webkit-scrollbar': {
      width: '16px',
    },

    '&::-webkit-scrollbar-track': {
      background: theme.palette.grey[800],
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: '20px',
      border: `5px solid ${theme.palette.grey[800]}`,
    },

    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.palette.grey[500],
    },
  },
});
