import * as React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Button,
  Typography,
  List,
  Theme,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import parse from 'html-react-parser';

import { useTrivia } from 'contexts/TriviaContext';

import { shuffle } from 'utils/shuffle';

import { StepperDot } from 'components/StepperDot';
import { AnswerButton } from 'components/AnswerButton';

type Alternative = {
  sentence: string;
  correct: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    header: {
      marginBottom: theme.spacing(2),

      display: 'flex',
      alignItems: 'center',
    },

    stepperContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(0.5),
      flex: 1,
      padding: `0 ${theme.spacing(2)}px`,
    },
  })
);

export default function Trivia() {
  const styles = useStyles();

  const router = useRouter();

  const {
    currentQuestions,
    currentPage,
    questionsQuantity,
    moveToNextPage,
    addCorrectQuestion,
    addWrongQuestion,
    correctQuestions,
    wrongQuestions,
  } = useTrivia();

  const [selectedAnswer, setSelectedAnswer] = React.useState('');

  const currentQuestion = React.useMemo(
    () => currentQuestions[currentPage],
    [currentPage, currentQuestions]
  );
  const alternatives: Alternative[] = React.useMemo(
    () =>
      currentQuestion
        ? shuffle([
            { sentence: currentQuestion.correct_answer, correct: true },
            ...currentQuestion.incorrect_answers.map(answer => ({
              sentence: answer,
              correct: false,
            })),
          ])
        : [],
    [currentQuestion]
  );

  React.useEffect(() => {
    if (currentQuestions.length === 0) {
      router.push('/');
    }
  }, [currentQuestions.length, router]);

  function handleNextQuestion() {
    moveToNextPage();
    setSelectedAnswer('');
  }

  function handleStepperDotVariant(index: number) {
    if (currentPage === index) {
      return 'current';
    }

    if (correctQuestions.includes(index)) {
      return 'correct';
    }

    if (wrongQuestions.includes(index)) {
      return 'wrong';
    }

    return 'default';
  }

  function handleAnswer(alternative: Alternative) {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(alternative.sentence);

    if (alternative.correct) {
      addCorrectQuestion();
    } else {
      addWrongQuestion();
    }
  }

  function handleAnswerButtonVariant(alternative: Alternative) {
    if (selectedAnswer && alternative.correct) {
      return 'correct';
    }

    if (selectedAnswer === alternative.sentence) {
      return 'wrong';
    }

    return 'default';
  }

  if (!process.browser || !currentQuestion) {
    return null;
  }

  return (
    <Container maxWidth="sm" className={styles.root}>
      <Box borderRadius="borderRadius" bgcolor="grey.800" p={4}>
        <div className={styles.header}>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption">
              Hits: {correctQuestions.length}
            </Typography>
            <Typography variant="caption">
              Misses: {wrongQuestions.length}
            </Typography>
          </Box>
          <Box className={styles.stepperContainer}>
            {Array(questionsQuantity)
              .fill(0)
              .map((_, index) => (
                <StepperDot
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  variant={handleStepperDotVariant(index)}
                />
              ))}
          </Box>
          <Button
            size="small"
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            Next
            <KeyboardArrowRightIcon />
          </Button>
        </div>

        <Typography variant="h5" gutterBottom>
          {parse(currentQuestion.question)}
        </Typography>

        <List>
          {alternatives.map(alternative => (
            <AnswerButton
              key={alternative.sentence}
              sentence={alternative.sentence}
              onClick={() => handleAnswer(alternative)}
              variant={handleAnswerButtonVariant(alternative)}
            />
          ))}
        </List>
      </Box>
    </Container>
  );
}
