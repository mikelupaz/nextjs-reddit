import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "theme";
import createEmotionCache from "src/createEmotionCache";
import SWRDevtools from "@jjordy/swr-devtools";
import { cache, mutate } from "swr";

const clientSideEmotionCache = createEmotionCache();
const WithDevTools = (BaseComponent) => (props) => {
  return process.env.NODE_ENV === "production" ? (
    <BaseComponent {...props} />
  ) : (
    <SWRDevtools
      cache={cache}
      mutate={mutate}
      CustomOpenComponent={
        <div className="text-white ml-4 flex items-center py-2 rounded font-extrabold uppercase px-3 transition duration-500 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110">
          DevTools
        </div>
      }
    >
      <BaseComponent {...props} />
    </SWRDevtools>
  );
};

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My Feed</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default WithDevTools(App);
