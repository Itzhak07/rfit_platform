import React, { useState, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import MainSectionLayout from "./MainSectionLayout";
import Background from "../../../../assets/images/landing-bg.jpg";
import { CircularProgress } from "@material-ui/core";

const AuthModal = lazy(() =>
  import(/* webpackChunkName: "AuthModal"*/ "../../../Modal/AuthModal")
);

const styles = theme => ({
  background: {
    backgroundImage: `url(${Background})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200,
    borderRadius: "50px"
  },
  titlePrimary: {
    fontSize: 42,
    [theme.breakpoints.up("lg")]: {
      fontSize: 50
    }
  },
  titleSecondary: {
    fontSize: 26,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(10),
      fontSize: 36
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

function MainSection(props) {
  const { classes } = props;

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const modalClose = () => {
    setOpen(false);
  };

  return (
    <MainSectionLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={Background}
        alt="increase priority"
      />

      <Typography
        className={classes.titlePrimary}
        color="inherit"
        align="center"
        marked="center"
        variant="h2"
      >
        Upgrade your appointments
      </Typography>
      <Typography
        color="inherit"
        align="center"
        className={classes.titleSecondary}
        variant="h4"
      >
        Discover the RFit Platform
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        onClick={openModal}
      >
        Sign Up
      </Button>

      <Suspense fallback={<CircularProgress />}>
        <AuthModal open={open} handleCLose={modalClose} type="Register" />
      </Suspense>
    </MainSectionLayout>
  );
}

MainSection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainSection);
