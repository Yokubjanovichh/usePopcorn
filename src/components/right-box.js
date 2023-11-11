import React from "react";
import { useState, useEffect } from "react";
import { Star } from "./index";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const key = "451dc717";

export default function RightBox({ selectedMovie, setSelectedMovie, isloading, setIsloading, setOnSetRating, onSetRating }) {
  const [show, setShow] = useState(true);
  const [movie, setMovie] = useState({});
  const [watcheMovies, setWatcheMovies] = useState([]);
  const { Title: title, Year: year, Poster: poster, imdbRating, Runtime: runtime } = movie;

  const handleAddWached = () => {
    const newWatcheMovie = {
      imdbID: selectedMovie,
      title,
      year,
      poster,
      userRating: onSetRating,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    setWatcheMovies([...watcheMovies, newWatcheMovie]);
    setSelectedMovie(null);
    console.log(watcheMovies);
  };
  useEffect(() => {
    async function getMovieDetails() {
      if (selectedMovie) {
        setIsloading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedMovie}`);
        const data = await res.json();
        setMovie(data);
        setIsloading(false);
      }
    }
    getMovieDetails();
  }, [selectedMovie]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(() => {
    function onClosing(e) {
      if (e.code === "Escape") {
        setSelectedMovie(null);
        console.log("Closing...");
      }
    }

    document.addEventListener("keydown", onClosing);

    return function () {
      document.removeEventListener("keydown", onClosing);
    };
  }, [selectedMovie]);

  return (
    <Paper sx={{ width: "400px", height: "630px", borderRadius: "0.9rem", background: "#2b3035", overflow: "scroll", position: "relative" }}>
      {selectedMovie && show && !isloading && (
        <Box onClick={() => setSelectedMovie(null)} width="30px" height="30px" sx={{ background: "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", position: "absolute", top: "10px", left: "10px", fontSize: "20px", color: "#2b3035", textAlign: "center" }}>
          &larr;
        </Box>
      )}
      <>
        <Box onClick={() => setShow(!show)} width="25px" height="25px" sx={{ background: "#212529", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", position: "absolute", top: "10px", right: "10px", fontSize: "20px", color: "#fff", textAlign: "center" }}>
          {show ? "-" : "+"}
        </Box>
        <Box sx={{ display: show ? "flex" : "none", flexDirection: "column", gap: "0px" }}>
          {selectedMovie ? (
            isloading ? (
              <Loading />
            ) : (
              <SelectedMovieDetails selectedMovie={selectedMovie} watcheMovies={watcheMovies} onSetRating={onSetRating} setOnSetRating={setOnSetRating} handleAddWached={handleAddWached} movie={movie} />
            )
          ) : (
            <>
              <Paper elevation={3} width="400px" sx={{ display: "flex", flexDirection: "column", gap: "0px", padding: "20px 30px", borderRadius: "12px", color: "#ffffffd0", background: "#343A3F" }}>
                <Typography variant="body1" textTransform="uppercase">
                  <b>movies you watched</b>
                </Typography>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Typography variant="subtitle1">#️⃣ {watcheMovies.length} movies</Typography>
                  <Typography variant="subtitle1">
                    ⭐️{" "}
                    {watcheMovies.length
                      ? (
                          watcheMovies.reduce((totalRuntime, movie) => {
                            const rating = Number(movie.imdbRating);
                            return isNaN(rating) ? totalRuntime : totalRuntime + rating;
                          }, 0) / watcheMovies.length
                        ).toFixed(1)
                      : "0"}
                  </Typography>
                  <Typography variant="subtitle1">
                    🌟{" "}
                    {watcheMovies.length
                      ? (
                          watcheMovies.reduce((totalUserRating, movie) => {
                            const ratingByUser = Number(movie.userRating);
                            return isNaN(ratingByUser) ? totalUserRating : totalUserRating + ratingByUser;
                          }, 0) / watcheMovies.length
                        ).toFixed(1)
                      : "0"}
                  </Typography>
                  <Typography variant="subtitle1">
                    ⏳{" "}
                    {watcheMovies.length
                      ? (
                          watcheMovies.reduce((totalRuntime, movie) => {
                            const time = Number(movie.runtime);
                            return isNaN(time) ? totalRuntime : totalRuntime + time;
                          }, 0) / watcheMovies.length
                        ).toFixed(1)
                      : "0"}{" "}
                    min
                  </Typography>
                </Box>
              </Paper>
              <RenderWachedMovies setWatcheMovies={setWatcheMovies} watcheMovies={watcheMovies} />
            </>
          )}
        </Box>
      </>
    </Paper>
  );
}

function SelectedMovieDetails({ selectedMovie, movie, handleAddWached, setOnSetRating, onSetRating, watcheMovies }) {
  const buttonStyles = {
    "&:hover": {
      backgroundColor: "#7950F2", // Hover bo'lganda fong'ni o'zgartiring
    },
  };
  return (
    <>
      <Box width="400px" height="auto" sx={{ background: "#343A3F", color: "#DFE2E7", display: "flex" }}>
        <img width="150px" height="auto" src={`${movie.Poster}`} alt={movie.Year} style={{ borderRadius: "12px 0px 0px 0px" }} />
        <Box width="250px" height="100%" sx={{ display: "flex", flexDirection: "column", gap: "17px", padding: "30px 25px" }}>
          <Typography variant="h5" lineHeight="100%">
            <b>{movie.Title}</b>
          </Typography>
          <Typography variant="subtitle1" lineHeight="100%">
            {movie.Released} &bull; {movie.Runtime}
          </Typography>
          <Typography variant="subtitle2" lineHeight="100%">
            {movie.Genre}
          </Typography>
          <Typography variant="subtitle2" lineHeight="100%">
            ⭐️ {movie.imdbRating} IMDb rating
          </Typography>
        </Box>
      </Box>

      <Box width="400px" height="auto" sx={{ display: "flex", flexDirection: "column", color: "#DFE2E7", gap: "20px", padding: "35px" }}>
        <Box sx={{ padding: "15px 20px 15px 20px", borderRadius: "7px", width: "maxContent", fontFamily: "sans-serif", backgroundColor: "#343A3F", display: "flex", gap: "15px", flexDirection: "column" }}>
          {watcheMovies.some((movie) => movie.imdbID === selectedMovie) ? (
            <Typography variant="subtitle2">You rated with movie {watcheMovies.find((movie) => movie.imdbID === selectedMovie)?.userRating} ⭐️</Typography>
          ) : (
            <>
              <Star onRating={setOnSetRating} />
              {onSetRating && (
                <Button onClick={handleAddWached} variant="contained" sx={{ ...buttonStyles, textTransform: "inherit", background: "#6841D9", borderRadius: "20px" }}>
                  <b>+ Add to list</b>
                </Button>
              )}
            </>
          )}
        </Box>
        <Typography variant="body2" lineHeight="120%">
          <em>{movie.Plot}</em>
        </Typography>
        <Typography variant="body2" lineHeight="120%">
          Starting {movie.Actors}
        </Typography>
        <Typography variant="body2" lineHeight="120%">
          Directed by {movie.Director}
        </Typography>
      </Box>
    </>
  );
}

function RenderWachedMovies({ watcheMovies, setWatcheMovies }) {
  const handleDelete = (id) => {
    const lastWatchedMovies = watcheMovies.filter((movie) => movie.imdbID !== id);
    setWatcheMovies(lastWatchedMovies);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0px", justifyContent: "flex-start" }}>
      {watcheMovies.map((movie) => {
        return (
          <Box key={movie.imdbID} sx={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 25px", borderBottom: "0.01px solid #ffffff64" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img src={movie.poster} alt={movie.title} width="55px" height="70px" />
              <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "flex-start" }}>
                <Typography lineHeight="100%" variant="h6" color="#fff">
                  {movie.title}
                </Typography>
                <Box sx={{ width: "100%", display: "flex", gap: "10px", alignItems: "center" }}>
                  <Typography lineHeight="100%" variant="body1" color="#fff">
                    ⭐️ {movie.imdbRating}
                  </Typography>
                  <Typography lineHeight="100%" variant="body1" color="#fff">
                    🌟 {movie.userRating}
                  </Typography>
                  <Typography lineHeight="100%" variant="body1" color="#fff">
                    ⏳ {movie.runtime}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton onClick={() => handleDelete(movie.imdbID)} aria-label="delete" sx={{ color: "red" }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
}

function Loading() {
  return (
    <Box sx={{ width: "100%", textAlign: "center", padding: "50px 0px" }}>
      <Typography textAlign="center" variant="h5" color="#ffffffd0">
        Loading...
      </Typography>
    </Box>
  );
}
