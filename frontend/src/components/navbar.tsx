import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef, useState, useEffect } from "react";
import { fetchApi } from "../lib/api";
import { ApplicationContext } from "../lib/auth";

const NavBar = ({csrftoken}: any) => {
  const userData = useContext(ApplicationContext).user;
  const [isMenuOpen, setMenu] = useState(false);
  const [isDrawerOpen, setDrawer] = useState(false);
  const [isProfileModalOpen, setProfileModal] = useState(false);
  const router = useRouter();

  const SignOut = async () => {
    await fetchApi("auth/logout/", csrftoken, {method: "POST"});
    router.push("/welcome");
  }

  return (
    <>
      <ProfileModal open={isProfileModalOpen} setOpen={setProfileModal} />
      <nav className="bg-gray-800" >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setDrawer(!isDrawerOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <Link href="/">
                <a className="text-3xl text-white font-medium font-titan">
                  <Image src="/doge.png" width={30} height={30} />
                  DOGECODE
                </a>
              </Link>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4 flex-nowrap">
                  {/* Don't show links when the user is on that page */}
                  {!(router.route === "/posts") ? (
                    <Link href="/posts">
                      <a
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        See the latest posts
                      </a>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {!(router.route === "/blog/new") ? (
                        <Link href="/blog/new">
                          <a
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            aria-current="page"
                          >
                            Create a post
                          </a>
                        </Link>
                      ) : (
                        <></>
                      )}
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setMenu(!isMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="rounded-full aspect-auto"
                      height={50}
                      width={50}
                      src={userData?.profile_picture ?? "/profile_picture.png"}
                      alt="profile picture"
                    />
                  </button>
                </div>

                {isMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <button
                      onClick={() => setProfileModal(!isProfileModalOpen)}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </button>

                      <button
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-2"
                        onClick={SignOut}
                      >
                        Sign out
                      </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isDrawerOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
            {!(router.route === "/blog/new") ? (
                    <Link href="/blog/new">
                      <a
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        Create a post
                      </a>
                    </Link>
                  ) : (
                    <></>
                  )}
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
            {!(router.route === "/blog/new") ? (
                    <Link href="/posts">
                      <a
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        See latest posts
                      </a>
                    </Link>
                  ) : (
                    <></>
                  )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

const ProfileModal = ({ open, setOpen }: any) => {
 const ref = useRef(null);
  const userData = useContext(ApplicationContext).user;

  // useEffect(() => {
  //   /**
  //    * Alert if clicked on outside of element
  //    */
  //   function handleClickOutside(event: MouseEvent) {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   }
  //   // Bind the event listener
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [ref]);
  return (
    <>
      {open ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full" ref={ref}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                  <Image
                      className="rounded-full"
                      height={250}
                      width={250}
                      src={userData?.profile_picture ?? "/profile_picture.png"}
                      alt="profile picture"
                    />
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        {userData?.username}
                      </h3>
                      {userData?.is_staff && <p className="text-stone-500 text-xs">Staff</p>}
                      <button onClick={() => setOpen(false)} className="absolute top-0 right-2">
                      <Cross2Icon height={30} />
                      </button>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your username: {userData?.username}
                          <br /><br />
                          More preferences coming soon!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavBar;
