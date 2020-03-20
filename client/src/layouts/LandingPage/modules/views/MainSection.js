import React, { useState, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import MainSectionLayout from "./MainSectionLayout";
import Background from "../../../../assets/images/landing-bg.jpg";
import { CircularProgress } from "@material-ui/core";
import LogoLight from "../../../../assets/images/logo_light.png";

const AuthModal = lazy(() =>
  import(/* webpackChunkName: "AuthModal"*/ "../../../Modal/AuthModal")
);

const styles = theme => ({
  background: {
    backgroundImage: `url(${Background})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
    transition: "all 0.3s ease"
  },
  button: {
    minWidth: 200,
    borderRadius: "50px"
  },
  titlePrimary: {
    fontSize: 40,
    // marginTop: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      fontSize: 50
      // marginTop: theme.spacing(4),
    }
  },
  titleSecondary: {
    fontSize: 26,
    maxWidth: 500,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    transition: "all 0.3s ease",
    [theme.breakpoints.up("md")]: {
      // marginTop: theme.spacing(4),
      fontSize: 40,
      maxWidth: 817,
      transition: "all 0.3s ease"
    }
  },
  more: {
    marginTop: theme.spacing(2)
  },
  logo: {
    maxWidth: 600,
    transition: "all 0.3s ease",
    [theme.breakpoints.down("md")]: {
      maxWidth: 500,
      transition: "all 0.3s ease"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
      transition: "all 0.3s ease"
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: 350,
      transition: "all 0.3s ease"
    }
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
      <img className={classes.logo} src={LogoLight} alt="logo_light" />
      <Typography
        className={classes.titlePrimary}
        // className={classes.titleSecondary}
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
