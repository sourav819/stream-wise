import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies?.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);

  return (
    <div className="bg-black">
      <div className="-mt-48 pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies} />
        <MovieList title={"Top Rated Movies"} movies={topRatedMovies} />
        <MovieList title={"Popular Movies"} movies={popularMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
