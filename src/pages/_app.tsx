import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import {
  ThemeProvider,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { TriviaProvider } from 'contexts/TriviaContext';

import { theme } from 'styles/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  const styles = useStyles();

  return (
    <>
      <Head>
        <title>Trivia Game!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <NextNProgress
        color={theme.palette.primary.main}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <TriviaProvider>
          <main className={styles.root}>
            <Component {...pageProps} />
          </main>
        </TriviaProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
