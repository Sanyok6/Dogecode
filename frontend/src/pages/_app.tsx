import { GetServerSidePropsContext } from "next";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import useSWR from "swr";
import NavBar from "../components/navbar";
import { fetchApi } from "../lib/api";
import { ApplicationContext } from "../lib/auth";
import { BlogPostTags, UserDataInterface } from "../lib/utils";
import "../styles/globals.css";

import { ParallaxProvider } from "react-scroll-parallax";

const fetcher = (url: string, csrftoken: string) =>
  fetchApi(url, csrftoken).then((res) => res.json());

export default function MyApp({ Component, pageProps }: AppProps) {
  const [userData, setUserData] = useState<UserDataInterface | null>(null);
  const [tagsData, setTags] = useState<BlogPostTags[]>([]);
  const { data, error: uError } = useSWR(["auth/users/me/", pageProps?.csrftoken], fetcher);

  useEffect(() => {
    if (data) {
      setUserData(data["user"]);
      setTags(data["tags"]);
    }
  }, [data, uError, userData, tagsData]);

  return (
    <ParallaxProvider>
      <ApplicationContext.Provider value={{user: userData, tags: tagsData}}>
        <NavBar csrftoken={pageProps?.csrftoken} />
        <Component {...pageProps} />
      </ApplicationContext.Provider>
    </ParallaxProvider>
  );
}

MyApp.getInitialProps = async (ctx: GetServerSidePropsContext) => {
  return {
    csrftoken: ctx.req?.cookies.csrftoken || null
  }
}