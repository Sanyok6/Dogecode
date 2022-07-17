import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetchApi } from "../../lib/api";
import { BlogPostData } from "../../lib/utils";

import Parser from "html-react-parser";

const fetcher = (csrf: string, id: number): Promise<BlogPostData> =>
  fetchApi(`blog/${id}/`, csrf).then((res) => res.json());

const BlogPostDetail = ({ csrftoken }: any) => {
  const { id } = useRouter().query;
  const { data } = useSWR([csrftoken, id], fetcher);
  return (
    <>
      <Head>
        <title>{data?.title || "Loading..."}</title>
      </Head>
      {!data ? (
        <h1 className="text-center text-6xl mt-48">Loading...</h1>
      ) : (
        <>
          <h1 className="font-medium text-5xl text-center underline">
            {data.title}
          </h1>
          {/* <div className="flex justify-center flex-nowrap space-x-2">
            <div className="hover:text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <div className="hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </div>
          </div> */}

          <div className="content text-center px-20">{Parser(data.content)}</div>

        </>
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
export default BlogPostDetail;
