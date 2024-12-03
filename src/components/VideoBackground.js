import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerInfo = useSelector((store) => store.movies?.trailer);
  useMovieTrailer(movieId);

  return (
    <div>
      <iframe
        className=" w-screen aspect-video z-50"
        src={
          "https://www.youtube.com/embed/" +
          trailerInfo?.key +
          "?loop=1&playlist=" +
          trailerInfo?.key +
          "&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
