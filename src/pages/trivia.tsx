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

import { StepperDot } from 'components/StepperDot';
import { AnswerButton } from 'components/AnswerButton';

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

  if (!process.browser) {
    return null;
  }

  return (
    <Container className={styles.root}>
      <Box borderRadius="borderRadius" bgcolor="grey.800" p={4}>
        <div className={styles.header}>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption">Hits: 6</Typography>
            <Typography variant="caption">Misses: 2</Typography>
          </Box>
          <Box className={styles.stepperContainer}>
            <StepperDot variant="current" />
            <StepperDot />
            <StepperDot />
            <StepperDot />
          </Box>
          <Button
            size="small"
            variant="contained"
            color="primary"
            disableElevation
          >
            Next
            <KeyboardArrowRightIcon />
          </Button>
        </div>

        <Typography variant="h5" gutterBottom>
          What&apos;s the square root of 49?
        </Typography>

        <List>
          <AnswerButton sentence="4" />
          <AnswerButton sentence="7" />
          <AnswerButton sentence="12" />
          <AnswerButton sentence="9" />
        </List>
      </Box>
    </Container>
  );
}
