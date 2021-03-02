import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { StyledLink } from "./styles/styledComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));
function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <StyledLink to="/">
            InnerCircle-QA
          </StyledLink>
          </Typography>
          <StyledLink to="/addTest">
            <Button color="secondary" variant="contained">
              Add Test
            </Button>
          </StyledLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
