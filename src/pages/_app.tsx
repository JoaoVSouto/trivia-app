import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { TriviaProvider } from 'contexts/TriviaContext';

import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Trivia Game!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <TriviaProvider>
          <Component {...pageProps} />
        </TriviaProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
