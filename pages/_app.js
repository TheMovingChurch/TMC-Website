import '@/styles/index.css'
import { storyblokInit, apiPlugin } from "@storyblok/react";

storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_SECRET,
  use: [apiPlugin]
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
