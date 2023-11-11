import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import style from "./style.module.css";

export default function LeftBox({ recivedMovies, loading, search, error, setSelectedMovie, isloading, setOnSetRating }) {
  const [show, setShow] = useState(true);
  const handleClick = (id) => {
    setOnSetRating("");
    if (!isloading) {
      setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
    }
  };
  return (
    <Paper sx={{ width: "400px", height: "630px", borderRadius: "0.9rem", background: "#2b3035", overflow: "scroll", position: "relative" }}>
      <ShowBtn setShow={setShow} show={show} />
      <Box sx={{ display: show ? "flex" : "none" }}>
        {error && <Error messadge={error} />}
        {recivedMovies ? loading ? <Loading /> : <RenderMovies handleClick={handleClick} recivedMovies={recivedMovies} /> : search ? <NotFound /> : ""}
      </Box>
    </Paper>
  );
}

function Loading() {
  return (
    <Box sx={{ width: "100%", padding: "50px 0px", textAlign: "center" }}>
      <Typography variant="h5" color="#ffffffd0">
        Loading...
      </Typography>
    </Box>
  );
}

function RenderMovies({ recivedMovies, handleClick }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0px", justifyContent: "flex-start" }}>
      {recivedMovies.map((movie) => {
        return (
          <Box onClick={() => handleClick(movie.imdbID)} className={style.boxHover} key={movie.imdbID} sx={{ width: "400px", display: "flex", gap: "20px", padding: "20px 25px", borderBottom: "0.01px solid #ffffff64" }}>
            <img src={movie.Poster} alt={movie.Title} width="55px" height="70px" />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", justifyContent: "flex-start" }}>
              <Typography lineHeight="100%" variant="h6" color="#fff">
                {movie.Title}
              </Typography>
              <Typography lineHeight="100%" variant="body1" color="#fff">
                🗓 {movie.Year}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function NotFound() {
  return (
    <Box sx={{ padding: "10px 20px" }}>
      <Typography variant="h5" color="#fff">
        Movie not found ⛔
      </Typography>
    </Box>
  );
}

function ShowBtn({ setShow, show }) {
  return (
    <Box onClick={() => setShow(!show)} width="25px" height="25px" sx={{ background: "#212529", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", position: "absolute", top: "10px", right: "10px", fontSize: "20px", color: "#fff", textAlign: "center" }}>
      {show ? "-" : "+"}
    </Box>
  );
}

function Error({ messadge }) {
  return (
    <Box sx={{ padding: "10px 20px" }}>
      <Typography variant="h5" color="#fff">
        ⛔ {messadge}
      </Typography>
    </Box>
  );
}

// if (recivedMovies) {
//   if (loading) {
//     <Loading />;
//   } else {
//     <RenderMovies recivedMovies={recivedMovies} />;
//   }
// } else {
//   if (search) <NotFound />;
//   else "";
// }

// if (recivedMovies) {
//   if (loading) <Loading />;
//   if (!loading && !error) <RenderMovies />;
//   if (error) <Error />;
// } else {
//   if (search) <NotFound />;
//   else "";
// }

// {recivedMovies ? loading ? <Loading /> : <RenderMovies recivedMovies={recivedMovies} /> : search ? <NotFound /> : ""}
