import { Typography, Container } from "@material-ui/core";
import { MovieList } from "../../components";
import useStyles from "./styles";

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Películas
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <MovieList />
      </Container>
    </>
  );
}
