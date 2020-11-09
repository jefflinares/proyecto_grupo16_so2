import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import SportsSoccer from "@material-ui/icons/SportsSoccer";
import Typography from "@material-ui/core/Typography";
import { Link } from "wouter";
import useStyles from "./styles";

function NavBar({ changeTheme = () => {} }) {
  const [check, setCheck] = React.useState(true);

  const handleChange = () => {
    setCheck(!check);
    changeTheme();
  };

  const classes = useStyles();

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <SportsSoccer className={classes.icon} />
        <Link href="/">
          <Typography variant="h6" color="inherit" noWrap>
          Películas
          </Typography>
        </Link>
        <div className={classes.switchTheme}>
          <Typography>Cambiar tema</Typography>
          <Switch
            checked={check}
            onChange={handleChange}
            color="default"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
