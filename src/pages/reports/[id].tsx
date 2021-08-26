import * as React from 'react';
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

import { QuestionCollapse } from 'components/QuestionCollapse';

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

    progressContainer: {
      display: 'flex',
      alignItems: 'center',

      '& .MuiLinearProgress-root': {
        flex: 1,
        margin: `0 ${theme.spacing(1)}px`,
      },
    },

    questionsContainer: {
      maxHeight: theme.spacing(50),
      marginTop: theme.spacing(1),
      overflowY: 'auto',

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

    backToHomeBtn: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function Report() {
  const styles = useStyles();

  if (!process.browser) {
    return null;
  }

  return (
    <Container maxWidth="sm" className={styles.root}>
      <Box borderRadius="borderRadius" bgcolor="grey.800" p={4}>
        <Typography variant="h4" className={styles.mainTitle} gutterBottom>
          #1 <span>Trivia</span> relatory
        </Typography>

        <div className={styles.progressContainer}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hits:
          <LinearProgress variant="determinate" value={60} color="secondary" />
          60% | 6/10
        </div>
        <div className={styles.progressContainer}>
          Misses:
          <MissesLinearProgress variant="determinate" value={40} />
          40% | 4/10
        </div>

        <List className={styles.questionsContainer}>
          <QuestionCollapse
            number={1}
            correct
            title="In the video-game franchise Kingdom Hearts, the main protagonist, carries a weapon with what shape?"
            answers={[
              { sentence: '33', variant: 'correct' },
              { sentence: '42', variant: 'default' },
            ]}
          />
          <QuestionCollapse
            number={2}
            correct={false}
            title="In the original Star Trek TV series, what was Captain James T. Kirk's middle name?"
            answers={[
              { sentence: 'Darth Vader', variant: 'correct' },
              { sentence: 'Luke Skywalker', variant: 'wrong' },
              { sentence: 'Jaba', variant: 'default' },
            ]}
          />
        </List>

        <Button
          variant="contained"
          color="primary"
          endIcon={<NavigateBeforeIcon />}
          className={styles.backToHomeBtn}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
}
