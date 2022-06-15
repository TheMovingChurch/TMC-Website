import '@/styles/index.css'
import { storyblokInit, apiPlugin } from "@storyblok/react";

storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_SECRET,
  use: [apiPlugin]
});

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
