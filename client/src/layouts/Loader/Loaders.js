import React from "react";
import {
  CircularProgress,
  makeStyles,
  Container,
  Backdrop,
} from "@material-ui/core";
import logoDark from "../../assets/images/logo.png";
import logoLight from "../../assets/images/logo_light.png";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh"
  },
  spinner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
  },
  logo: {
    maxWidth: 283,
    position: "relative",
    top: 227,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    alignItems: "baseline",
    transition: "all 0.5s ease",
  },
}));

export const BigLogoSpinner = ({ logo }) => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.spinner}>
        <img className={classes.logo} src={logo ? logo : logoDark} alt="logo" />
        <CircularProgress size={300} thickness={2} />
      </div>
    </Container>
  );
};

export const BackdropLogoLoader = ({ loading }) => {
  const classes = useStyles();

  return (
    <Backdrop open={loading} className={classes.backdrop}>
      <BigLogoSpinner logo={logoLight} />
    </Backdrop>
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
