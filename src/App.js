import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { SearchBar, LeftBox, RightBox } from "./components";

import "./main.css";

const key = "451dc717";

export default function App() {
  const [search, setSearch] = useState("");
  const [recivedMovies, setRecivedMovies] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [onSetRating, setOnSetRating] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovie() {
        // Qidiruv so'rovi 3 ta belgidan kam bo'lsa, fetch so'rovini yubormaslik
        if (!search || search.length < 3) {
          setRecivedMovies([]);
          setError("");
          return;
        }
        try {
          setLoading(true);
          setError("");
          const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${search}`, { signal: controller.signal });
          if (!res.ok) {
            throw new Error("Something went wrong fetching movies");
          }
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setRecivedMovies(data.Search);
          setCount(data.Search?.length);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      setSelectedMovie(null);
      fetchMovie();
      return function () {
        controller.abort();
      };
    },
    [search]
  );

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} mt={3}>
          <SearchBar count={count} setRecivedMovies={setRecivedMovies} setSearch={setSearch} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ display: "flex", justifyContent: "center", columnGap: "20px" }}>
            <Box>
              <LeftBox setOnSetRating={setOnSetRating} isloading={isloading} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} error={error} search={search} loading={loading} recivedMovies={recivedMovies} />
            </Box>
            <Box>
              <RightBox onSetRating={onSetRating} setOnSetRating={setOnSetRating} isloading={isloading} setIsloading={setIsloading} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
