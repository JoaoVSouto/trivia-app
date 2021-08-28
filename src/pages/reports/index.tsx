import * as React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
  darken,
} from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { useTrivia } from 'contexts/TriviaContext';

import { customScrollbar } from 'styles/customScrollbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    mainTitle: {
      fontWeight: 400,
      userSelect: 'none',
    },

    reportsContainer: {
      maxHeight: '50vh',
      overflowY: 'auto',
      ...customScrollbar.scrollbar,
    },

    reportBtn: {
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.palette.grey[700],
      width: 'clamp(12rem, 20vw, 20rem)',

      '&:hover, &:focus': {
        backgroundColor: darken(theme.palette.grey[700], 0.1),
      },

      '& + &': {
        marginTop: theme.spacing(1),
      },
    },

    backToHomeBtn: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function Report() {
  const styles = useStyles();

  const router = useRouter();

  const { playedTrivias } = useTrivia();

  React.useEffect(() => {
    if (playedTrivias.length === 0) {
      router.push('/');
    }
  }, [playedTrivias.length, router]);

  function handleNavigateToReport(reportId: number) {
    router.push(`/reports/${reportId}`);
  }

  function handleGoBack() {
    router.push('/');
  }

  if (!process.browser || playedTrivias.length === 0) {
    return null;
  }

  return (
    <Container className={styles.root}>
      <Box borderRadius="borderRadius" bgcolor="grey.800" p={4}>
        <Typography variant="h4" className={styles.mainTitle} gutterBottom>
          Reports
        </Typography>

        <List className={styles.reportsContainer}>
          {playedTrivias.map(playedTrivia => (
            <ListItem
              key={playedTrivia.id}
              button
              className={styles.reportBtn}
              onClick={() => handleNavigateToReport(playedTrivia.id)}
            >
              <ListItemText
                primary={`Report #${playedTrivia.id}`}
                secondary={new Date(playedTrivia.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          endIcon={<NavigateBeforeIcon />}
          className={styles.backToHomeBtn}
          onClick={handleGoBack}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
}
