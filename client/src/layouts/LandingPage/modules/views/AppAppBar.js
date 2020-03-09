import React, { lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import {
  CircularProgress,
  Button,
  Typography,
} from "@material-ui/core";

const AuthModal = lazy(() =>
  import(/* webpackChunkName: "AuthModal"*/ "../../../Modal/AuthModal")
);

const styles = theme => ({
  title: {
    fontSize: 24,
    color: 'white'
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-evenly"
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 2,
    display: "flex",
    justifyContent: "center"
  },
  rightLink: {
    fontSize: 14,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  },

});

function AppAppBar(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [formType, setForm] = useState("");

  const openModal = type => {
    setOpen(true);
    setForm(type);
  };
  const modalClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Typography className={classes.title} variant="h5">
            RFit Platform
          </Typography>
          <div className={classes.right}>
            <Button
              onClick={() => openModal("Login")}
              className={classes.rightLink}
            >
              {"Sign In"}
            </Button>
            <Button
              onClick={() => openModal("Register")}
              className={clsx(classes.rightLink, classes.linkSecondary)}
            >
              {"Sign Up"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
      <Suspense fallback={<CircularProgress />}>
        <AuthModal open={open} handleCLose={modalClose} type={formType} />
      </Suspense>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
