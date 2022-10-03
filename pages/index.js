import Head from "next/head";
import Image from "next/image";
import { Provider } from "react-redux";
import Landing from "../components/LandingPage/index";
import store from "../stores/store";

import _app from "./_app";

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </Provider>
  );
}
