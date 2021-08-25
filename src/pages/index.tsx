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
import clsx from 'clsx';

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
      justifyContent: 'flex-end',
      marginTop: theme.spacing(2),
    },
  })
);

export default function Home() {
  const styles = useStyles();

  return (
    <Container maxWidth="sm" className={styles.root}>
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
        <form autoComplete="off">
          <TextField
            type="number"
            id="questions-quantity"
            label="Quantity"
            variant="outlined"
            fullWidth
          />
          <div className={styles.btnContainer}>
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
