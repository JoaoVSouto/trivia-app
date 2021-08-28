import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Theme,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AssessmentIcon from '@material-ui/icons/Assessment';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

    title: {
      marginBottom: theme.spacing(2),
    },

    btnContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(2),
    },
  })
);

const GameSetupSchema = Yup.object().shape({
  quantity: Yup.number()
    .min(3, 'The quantity should be between 3 and 50')
    .max(50, 'The quantity should be between 3 and 50')
    .required('Quantity is required'),
});

export default function Home() {
  const styles = useStyles();

  const router = useRouter();

  const { updateQuestionsQuantity, playedTrivias } = useTrivia();

  const formik = useFormik({
    initialValues: {
      quantity: '',
    },
    validationSchema: GameSetupSchema,
    onSubmit: values => {
      updateQuestionsQuantity(Number(values.quantity));
      router.push('/lobby');
    },
  });

  function handleNavigateToReports() {
    router.push('/reports');
  }

  return (
    <Container className={styles.root}>
      <Box>
        <Typography
          className={clsx(styles.mainTitle, styles.title)}
          variant="h1"
          align="center"
        >
          <span>Trivia</span> Game!
        </Typography>
        <Typography
          className={styles.title}
          variant="h5"
          component="h2"
          align="center"
        >
          How many questions do you want to answer?
        </Typography>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <TextField
            type="number"
            id="questions-quantity"
            name="quantity"
            label="Quantity"
            variant="outlined"
            fullWidth
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.quantity && formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <div className={styles.btnContainer}>
            {playedTrivias.length > 0 ? (
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<AssessmentIcon />}
                onClick={handleNavigateToReports}
              >
                Your reports
              </Button>
            ) : (
              <span />
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
