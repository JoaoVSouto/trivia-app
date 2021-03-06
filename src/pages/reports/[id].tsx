import * as React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  LinearProgress,
  Theme,
  List,
  Button,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  withStyles,
  darken,
} from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import parse from 'html-react-parser';

import { useTrivia } from 'contexts/TriviaContext';

import { Alternative } from 'models/Question';

import { QuestionCollapse } from 'components/QuestionCollapse';

import { customScrollbar } from 'styles/customScrollbar';

const MissesLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    colorPrimary: {
      backgroundColor: darken(theme.palette.error.main, 0.55),
    },
    bar: {
      backgroundColor: theme.palette.error.main,
    },
  })
)(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainTitle: {
      fontWeight: 400,
      userSelect: 'none',
    },

    progressContainer: {
      display: 'flex',
      alignItems: 'center',

      '& .MuiLinearProgress-root': {
        flex: 1,
        margin: `0 ${theme.spacing(1)}px`,
      },
    },

    questionsContainer: {
      maxHeight: '50vh',
      marginTop: theme.spacing(1),
      overflowY: 'auto',
      ...customScrollbar.scrollbar,
    },

    backToHomeBtn: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function Report() {
  const styles = useStyles();

  const router = useRouter();
  const triviaId = Number(router.query.id);

  const { playedTrivias } = useTrivia();

  const trivia = React.useMemo(
    () => playedTrivias.find(playedTrivia => playedTrivia.id === triviaId),
    [playedTrivias, triviaId]
  );

  const correctPercentage = React.useMemo(
    () => Math.round((trivia?.correctAmount / trivia?.questions.length) * 100),
    [trivia]
  );

  const missesPercentage = React.useMemo(
    () => 100 - correctPercentage,
    [correctPercentage]
  );

  function handleQuestionAnswerVariant(alternative: Alternative) {
    if (alternative.correct) {
      return 'correct';
    }

    if (alternative.marked) {
      return 'wrong';
    }

    return 'default';
  }

  function handleGoBack() {
    router.back();
  }

  if (!process.browser || !trivia) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box borderRadius="borderRadius" bgcolor="grey.800" p={4}>
        <Typography variant="h4" className={styles.mainTitle} gutterBottom>
          #{triviaId} <span>Trivia</span> report
        </Typography>

        <div className={styles.progressContainer}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hits:
          <LinearProgress
            variant="determinate"
            value={correctPercentage}
            color="secondary"
          />
          {correctPercentage}% | {trivia.correctAmount}/
          {trivia.questions.length}
        </div>
        <div className={styles.progressContainer}>
          Misses:
          <MissesLinearProgress
            variant="determinate"
            value={missesPercentage}
          />
          {missesPercentage}% | {trivia.wrongAmount}/{trivia.questions.length}
        </div>

        <List className={styles.questionsContainer}>
          {trivia.questions.map((question, index) => (
            <QuestionCollapse
              key={question.sentence}
              number={index + 1}
              correct={question.correct}
              title={String(parse(question.sentence))}
              answers={question.alternatives.map(alternative => ({
                sentence: String(parse(alternative.sentence)),
                variant: handleQuestionAnswerVariant(alternative),
              }))}
            />
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
