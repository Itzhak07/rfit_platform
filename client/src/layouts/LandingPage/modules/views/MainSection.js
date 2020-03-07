import React, { useState, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import MainSectionLayout from "./MainSectionLayout";
import Background from "../../../../assets/images/landing-bg.jpg";
import { CircularProgress } from "@material-ui/core";

const AuthModal = lazy(() =>
  import(/* webpackChunkName: "AuthModal"*/ "../../../AuthModal")
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
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10)
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

      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your appointments
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h4"
        className={classes.h5}
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
        Register
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
