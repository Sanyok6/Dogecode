import { Cross2Icon } from "@radix-ui/react-icons";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { fetchApi } from "../../lib/api";
import { ApplicationContext } from "../../lib/auth";
import { BlogPostTags, PageProps } from "../../lib/utils";

const CreateNewPost: NextPage<PageProps> = ({ csrftoken }: PageProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postTags, _setPostTags] = useState<BlogPostTags[]>([]);
  const tags = useContext(ApplicationContext).tags;
  const router = useRouter();

  const handlePostCreate = async (e: any) => {
    e.preventDefault();

    const tagIds = postTags.map((t) => t.id);
    await fetchApi("blog/", csrftoken, {
      method: "POST",
      body: JSON.stringify({ title, content, tags: tagIds }),
    });
    router.push("/");
  };

  const setPostTags = (newTags: BlogPostTags[]) => {
    // Don't allow duplicate tags
    _setPostTags(newTags.filter((x, i, a) => a.indexOf(x) === i));
  };

  return (
    <>
      <Head>
        <title>Create new post</title>
      </Head>
      <div className="flex justify-center min-w-[70vw]">
        <div className="mt-10 sm:mt-0 py-10 items-center">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Create a new Post
            </h3>
            <div className="md:col-span-1"></div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md  min-w-[60vw]">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Body
                        </label>
                        <textarea
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tags
                        </label>
                        {postTags.map((t) => (
                          <div key={t.id} className="flex rounded border ml-2">
                            <button
                              onClick={() => {
                                setPostTags(
                                  postTags.filter((nt) => nt.name != t.name)
                                );
                              }}
                            >
                              <Cross2Icon />
                            </button>
                            <p className="text-sm pl-2">{t.name}</p>
                          </div>
                        ))}
                        <select
                          onChange={(e) => {
                            const tag = tags.filter(
                              (t) => t.name === e.currentTarget.value
                            )[0];

                            if (tag) {
                              setPostTags([...postTags, tag]);
                            }
                          }}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" selected disabled hidden>
                            Choose here
                          </option>
                          {tags.map((tag) => (
                            <option key={tag.id}>{tag.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={(e) => handlePostCreate(e)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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

export default CreateNewPost;
