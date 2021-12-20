import Song from "./Song";

const Songs = ({ songs }) => {
  return (
    <ol className="pb-20 list-decimal space-y-2 marker:">
      {songs.map(
        ({ track: { album, artists, name, id, duration_ms, uri } }, index) => (
          <Song
            key={id}
            duration={duration_ms}
            name={name}
            order={index + 1}
            image={album.images?.[0]?.url}
            albumName={album.name}
            artist={artists[0].name}
            uri={uri}
          />
        )
      )}
    </ol>
  );
};

export default Songs;
