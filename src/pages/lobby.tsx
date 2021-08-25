import { Container, Box, Typography, Theme, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

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
      justifyContent: 'flex-end',
      marginTop: theme.spacing(2),
    },

    goBackBtn: {
      marginLeft: theme.spacing(2),
    },
  })
);

export default function Home() {
  const styles = useStyles();

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
            endIcon={<SportsEsportsIcon />}
          >
            Let&apos;s play!
          </Button>
          <Button
            className={styles.goBackBtn}
            variant="outlined"
            color="default"
            endIcon={<NavigateBeforeIcon />}
          >
            Go back
          </Button>
        </div>
      </Box>
    </Container>
  );
}
