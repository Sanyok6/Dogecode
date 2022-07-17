import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { fetchApi, formatApiErrors } from "../lib/api";
import { PageProps } from "../lib/utils";

const LoginPage: NextPage<PageProps> = ({csrftoken}: PageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Array<string>>([]);

  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetchApi("auth/login/", csrftoken, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors(formatApiErrors(data));
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {/*{errors.map((error, _) => {<ToastProvider swipeDirection="right">
      <Toast open={true} onOpenChange={() => {}} duration={3000}>
        <h1>Error</h1>
        <ToastDescription asChild>
          {error}
        </ToastDescription>
      </Toast>
    </ToastProvider>})} */}
      <section className="h-screen">
        <div className="lg:ml-10 px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-4/12 lg:w-4/12 md:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form className="">
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold text-xl mx-4 mb-0">
                    Welcome back!
                  </p>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email"
                    minLength={5}
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    minLength={4}
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link href="/signup">
                    <a className="ml-1">
                      Signup
                    </a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      csrftoken: ctx.req.cookies.csrftoken || null
    }
  }
}

export default LoginPage;
