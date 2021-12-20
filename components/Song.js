import spotifyApi from "../lib/spotify";
import { millisToMinutesAndSeconds } from "../lib/time";

const Song = ({ artist, albumName, name, duration, image, uri }) => {
  const playSong = () => {
    spotifyApi
      .play({
        uris: [uri],
      })
      .catch((error) => {
        if (error.body.error.reason === "PREMIUM_REQUIRED") {
          console.error("PREMIUM REQUIRED for this functionality");
        }
      });
  };
  return (
    <li>
      <button
        className="grid grid-cols-2 text-gray-500 hover:bg-gray-900 px-4 py-1 rounded w-full text-left cursor-pointer"
        onClick={playSong}
      >
        <div className="flex items-center space-x-4">
          <img src={image} className="w-10 h-10" alt="" />
          <div>
            <p className="w-36 text-white lg:w-64 truncate">{name}</p>
            <p className="w-40">{artist}</p>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="hidden md:inline">{albumName}</p>
          <p>{millisToMinutesAndSeconds(duration)}</p>
        </div>
      </button>
    </li>
  );
};

export default Song;
