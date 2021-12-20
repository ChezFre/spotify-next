import { signout } from "next-auth/react";
import Head from "next/head";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Sidebar from "../components/Sidebar";
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        <div className="flex-grow text-white min-h-screen overflow-auto max-h-screen">
          <header className="absolute top-5 right-8">
            <button
              onClick={() => signOut()}
              className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
            >
              <img
                src={session?.user.image}
                className="w-10 h-10 rounded-full"
              />
              <h2>{session?.user.name}</h2>
              <ChevronDownIcon className="w-5 h-5" />
            </button>
          </header>
          <section>{children}</section>
        </div>
      </main>
    </div>
  );
};

export default Layout;
