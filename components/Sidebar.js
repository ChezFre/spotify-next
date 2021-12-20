import { useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((result) => {
        setPlaylists(result.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 space-y-4 h-screen overflow-auto sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block">
      <button className="flex items-center space-x-2 hover:text-white">
        <HomeIcon className="h-5 w-5" />
        <p>Home</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <SearchIcon className="h-5 w-5" />
        <p>Search</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <LibraryIcon className="h-5 w-5" />
        <p>Library</p>
      </button>
      <hr className="border-t-[0.1px] border-gray-900" />
      <button className="flex items-center space-x-2 hover:text-white">
        <PlusCircleIcon className="h-5 w-5" />
        <p>Create playlist</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <HeartIcon className="h-5 w-5" />
        <p>Liked songs</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <RssIcon className="h-5 w-5" />
        <p>Your episodes</p>
      </button>
      <hr className="border-t-[0.1px] border-gray-900" />
      {playlists.map(({ id, name }) => (
        <Link key={id} href={`/playlist/${id}`}>
          <a className="block space-x-2 hover:text-white truncate">{name}</a>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
