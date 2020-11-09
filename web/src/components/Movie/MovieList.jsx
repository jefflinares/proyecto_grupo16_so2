import { Grid } from "@material-ui/core";
import { GetMovies } from "../../hooks/getMovies";
import { Movie } from "./Movie";

export default function MovieList() {
  const { movies } = GetMovies();

  return (
    <Grid container spacing={4}>
      {movies.map((movie) => (
        <Movie {...movie} />
      ))}
    </Grid>
  );
};
