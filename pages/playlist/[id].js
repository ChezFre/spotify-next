import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Songs from "../../components/Songs";
import useSpotify from "../../hooks/useSpotify";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Playlist = () => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const { id } = router.query;
  const [playlist, setPlaylist] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(Math.round(Math.random() * (colors.length - 1)));
  }, [router.query?.id]);

  useEffect(() => {
    // if (spotifyApi.getAccessToken() && id) {
    spotifyApi
      .getPlaylist(id)
      .then((result) => {
        setPlaylist(result.body);
      })
      .catch((error) => {
        router.replace("/");
      });
    // }
  }, [spotifyApi, session, id]);

  if (!playlist) return null;

  return (
    <div>
      <div
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colors[color]} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=""
          className="w-44 h-44 shadow-2xl"
        />
        <div>
          <p>Playlist</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist.name}
          </h1>
        </div>
      </div>
      <div className="p-10">
        <Songs songs={playlist.tracks.items} />
      </div>
    </div>
  );
};

Playlist.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Playlist;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
