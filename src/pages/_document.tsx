import * as React from 'react';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

import { theme } from 'styles/theme';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="description"
            content="Test your general knowledge through exciting questions!"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://trivia-app-joaovsouto.vercel.app"
          />
          <meta property="og:title" content="Trivia Game!" />
          <meta
            property="og:description"
            content="Test your general knowledge through exciting questions!"
          />
          <meta
            property="twitter:url"
            content="https://trivia-app-joaovsouto.vercel.app"
          />
          <meta property="twitter:title" content="Trivia Game!" />
          <meta
            property="twitter:description"
            content="Test your general knowledge through exciting questions!"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
