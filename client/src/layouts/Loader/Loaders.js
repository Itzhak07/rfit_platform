import React from "react";
import { CircularProgress, makeStyles, Container } from "@material-ui/core";
import logo from "../../assets/images/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    // height: "100vh"
  },
  spinner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto"
  },
  logo: {
    maxWidth: 283,
    position: "relative",
    top: 227
  }
}));

export const BigLogoSpinner = () => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.spinner}>
        <img className={classes.logo} src={logo} alt="logo" />
        <CircularProgress size={300} thickness={2} />
      </div>
    </Container>
  );
};

export const CircularLoader = ({ size, color }) => {
  return (
    <div style={{ width: !size ? 40 : size, margin: "auto" }}>
      <CircularProgress
        size={!size ? 40 : size}
        color={!color ? "primary" : color}
      />
    </div>
  );
};