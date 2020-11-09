import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";
import useStyles from "./styles";

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Visor de películas
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Página hecha para el proyecto de Sistemas Operativos 2
      </Typography>
      <Copyright />
    </footer>
  );
}

export default Footer;
