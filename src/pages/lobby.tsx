import * as React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  Theme,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { useTrivia } from 'contexts/TriviaContext';

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

      '& span': {
        color: theme.palette.primary.main,
      },
    },

    btnContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },

    goBackBtn: {
      marginLeft: theme.spacing(2),
    },
  })
);

export default function Lobby() {
  const styles = useStyles();

  const router = useRouter();

  const {
    questionsQuantity,
    updateQuestionsQuantity,
    playTrivia,
    isFetchingQuestions,
    correctQuestions,
    wrongQuestions,
    resetQuestionsCorrectness,
    resetCurrentPage,
    resetQuestionsAnswers,
  } = useTrivia();

  React.useEffect(() => {
    if (correctQuestions.length > 0 || wrongQuestions.length > 0) {
      resetQuestionsCorrectness();
      resetCurrentPage();
      resetQuestionsAnswers();
    }

    if (questionsQuantity === 0) {
      router.push('/');
    }
  }, [
    correctQuestions.length,
    questionsQuantity,
    resetCurrentPage,
    resetQuestionsAnswers,
    resetQuestionsCorrectness,
    router,
    wrongQuestions.length,
  ]);

  function handleGoBack() {
    updateQuestionsQuantity(0);
    router.push('/');
  }

  return (
    <Container className={styles.root}>
      <Box>
        <Typography className={styles.mainTitle} variant="h2" align="center">
          Are you ready for the <span>Trivia</span>?
        </Typography>

        <div className={styles.btnContainer}>
          <Button
            variant="contained"
            color="primary"
            endIcon={!isFetchingQuestions && <SportsEsportsIcon />}
            onClick={playTrivia}
            disabled={isFetchingQuestions}
          >
            {isFetchingQuestions ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Let's play!"
            )}
          </Button>
          <Button
            className={styles.goBackBtn}
            variant="outlined"
            color="default"
            endIcon={<NavigateBeforeIcon />}
            onClick={handleGoBack}
            disabled={isFetchingQuestions}
          >
            Go back
          </Button>
        </div>
      </Box>
    </Container>
  );
}
