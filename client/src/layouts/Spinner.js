import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import logo from "../assets/images/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  spinner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto"
  },
  logo: {
    width: 350,
    position: "relative",
    top: 280
  }
}));

export const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.spinner}>
        <img className={classes.logo} src={logo} alt="logo"/>
        <CircularProgress size={400} thickness={2} />
      </div>
    </div>
  );
};