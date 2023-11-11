import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

export default function SearchBar({ setSearch, setRecivedMovies, count }) {
  const handleChange = (e) => {
    setRecivedMovies([]);
    setSearch(e.target.value);
  };
  return (
    <Paper elevation={1} sx={{ background: "#6841D9", padding: "5px 0px 5px 0px", borderRadius: "10px" }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={3}>
          <Typography color="#fff" variant="subtitle1" fontSize="35px" ml={3}>
            🍿 <b style={{ fontSize: "25px" }}>usePopcorn</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400, background: "#7950F2" }}>
            <InputBase onChange={handleChange} size="medium" sx={{ ml: 1, flex: 1, color: "#c5cede", fontSize: "18px" }} placeholder="Search movies..." />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography color="#fff" variant="h6" component="h4" sx={{ textAlign: "end" }} mr={3}>
            Found {count ? count : 0} results
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
