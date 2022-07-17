// import { NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";

// const WelcomePage: NextPage = () => {
//   return (
//     <>
//       <Head>
//         <title>Welcome</title>
//       </Head>
//       <p className="text-2xl mt-52 font-bold text-center mb-6 underline">
//         You're not logged in
//       </p>

//       <div className="flex items-center justify-center">
//         <Link href="/login">
//           <a className="pr-4">Login</a>
//         </Link>

//         <Link href="/signup">
//           <a>Signup</a>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default WelcomePage;








/* This example requires Tailwind CSS v2.0+ */
import { NextPage } from 'next'

import {AnnotationIcon, GlobeAltIcon, LightningBoltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'

import { ParallaxProvider, useParallax } from 'react-scroll-parallax'
import Link from 'next/link'

const features = [


  {
    name: 'Tell other people about new projects',
    description:
      'Tell the comunity about new projects you have created or are working on.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Tell people about new features',
    description:
      'You can create a post and tell people about new features in your project.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Talk about your workflow, what problems you face, and how you solved them',
    description:
      'Create posts taking about how you approach solving problems, talk about common problems, or give people tips in how to make their project better.',
    icon: QuestionMarkCircleIcon,
  },
  {
    name: 'Just enjoy the community!',
    description:
      'There is so much on DOGECODE! React to posts, learn about great resources, communicate with other developers, and find solutions to your problems, all on one platform!',
    icon: AnnotationIcon,
  },
]



const WelcomePage: NextPage = () => {

  const parallax = useParallax<HTMLDivElement>({
    translateX:['-10vw', '100vw'],
    scale:[0.75, 1],
    rotate: [-180, 0],
    easing: "easeOutQuad",
  });

  return (
    <div className="relative bg-white overflow-hidden">
      <div className='h-[90vh]'>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Keep in touch with fellow programmers with</span>{' '}
                  <span className="block text-indigo-600 xl:inline">DOGECODE</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  DOGECODE allows its users to view and post programming related content, this includes solutions to common problems,
                  announcements about open source projects, and much, much, more.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/posts"
                      
                    >
                      <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      See Posts
                      </div>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/signup"
                      >
                      <div 
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Sign Up
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/3">
          <img 
            className="w-3/4 rotate-[15deg] lg:mt-20"
            src="/coin.png"
            alt=""
          />
        </div>
      </div>


      <div ref={parallax.ref} className="w-[200px]">
        <img 
          
          src="/coin.png"
          alt=""
        />
      </div>

      <div className=" bg-indigo-100 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="mt-20 py-64">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

    <div className="mt-[25vh] mb-[25vh]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">What are you waiting for?</span>
          <span className="block text-indigo-600">Sign up, or just start browsing!</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/posts"
            >
              <div
               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"

              >
              See the latest posts</div>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
              Sign up, and start posting!</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-200 h-10 pt-2 text-center">
      this project is open source!
    </div>
    </div>
  )
}


export default WelcomePage;