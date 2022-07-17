import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import BlogPostCard from "../components/blog_post";
import { fetchApi } from "../lib/api";
import { ApplicationContext } from "../lib/auth";
import { BlogPostPaginator, PageProps } from "../lib/utils";

const fetcher = (url: string, csrftoken: string) =>
  fetchApi(url, csrftoken).then((res) => res.json());

const Home: NextPage<PageProps> = ({ csrftoken }: PageProps) => {
  const userData = useContext(ApplicationContext).user;
  const [blogPosts, _setBlogPosts] = useState<BlogPostPaginator | null>(null);
  const { data: blogPostsData, error: bErr } = useSWR(
    ["blog/", csrftoken],
    fetcher
  );

  const setBlogPosts = (newBlogPosts: BlogPostPaginator) => {
    const newData: BlogPostPaginator = { ...newBlogPosts };
    newData.results = [...newBlogPosts.results, ...(blogPosts?.results || [])];
    _setBlogPosts(newData);
  };

  useEffect(() => {
    if (blogPostsData) {
      _setBlogPosts(blogPostsData);
    }
  }, [blogPostsData]);

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      {!userData?.username ? (
        <h1 className="text-center text-6xl mt-48">Loading...</h1>
      ) : (
        <div className="px-20">
          <p className="text-2xl mt-24 font-bold mb-6">
            Hello {userData?.username}
          </p>

          <h1 className="m-1">Here are some posts</h1>
          <div className="flex flex-wrap">
            {blogPosts?.results?.map((post) => (
              <BlogPostCard key={post.id} data={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return {
    props: {
      csrftoken: ctx.req.cookies.csrftoken || null,
    },
  };
};

export default Home;
