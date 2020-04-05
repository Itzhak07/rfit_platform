import React, { lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import { Button, Typography } from "@material-ui/core";
import { Spring } from "react-spring/renderprops";
import { Link } from "react-scroll";
import { menuList } from "./utils";
import { isMobile } from "react-device-detect";
import { CircularLoader } from "../../../Loader/Loaders";

const AuthModal = lazy(() =>
  import(/* webpackChunkName: "AuthModal"*/ "../../../Modal/AuthModal")
);

const MobileMenu = lazy(() =>
  import(/* webpackChunkName: "MobileMenu"*/ "../components/MobileMenu")
);

const styles = (theme) => ({
  root: {
    position: "absolute",
  },
  title: {
    fontSize: 24,
    color: "white",
    cursor: "pointer",
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-evenly",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
  },
  rightLink: {
    fontSize: 14,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
  },
  linkItem: {
    color: theme.palette.common.white,
  },
  signUpButton: {
    color: theme.palette.secondary.main,
  },
  menuButton: {
    color: theme.palette.common.white,
    fontSize: 20,
    transition: "all 0.3s ease",
  },
  active: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
});

function AppAppBar(props) {
  const { classes } = props;
  const [open, setOpen] = useState({
    menu: false,
    modal: false,
  });

  const [formType, setForm] = useState("");

  const { menu, modal } = open;

  const modalHandler = (type) => {
    setOpen({ ...open, modal: !modal });

    if (type) {
      setForm(type);
    }
  };

  const menuHandler = () => {
    setOpen({ ...open, menu: !menu });
  };

  const appBarDesktopItems = menuList.map((item, index) => {
    return (
      <Button key={index}>
        <Link
          to={item.to}
          spy={true}
          smooth={true}
          offset={item.offset}
          duration={500}
          className={classes.linkItem}
          activeClass={classes.active}
        >
          {item.primary}
        </Link>
      </Button>
    );
  });

  const lazyAppBarMobileMenu = (
    <Suspense fallback={<CircularLoader />}>
      <MobileMenu
        className={classes.menuButton}
        open={open.menu}
        setOpen={menuHandler}
      />
    </Suspense>
  );

  return (
    <Spring
      from={{ opacity: 0, marginTop: -500 }}
      to={{ opacity: 1, marginTop: 0 }}
      config={{ velocity: 10 }}
    >
      {(props) => (
        <div className={classes.root}>
          <AppBar style={props} position="fixed">
            <Toolbar className={classes.toolbar}>
              <div className={classes.left} />

              <Link
                to="main-section"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                <Typography className={classes.title} variant="h5">
                  RFit Platform
                </Typography>
              </Link>
              <div className={classes.right}>
                {!isMobile ? appBarDesktopItems : lazyAppBarMobileMenu}

                <Button
                  onClick={() => modalHandler("Login")}
                  className={classes.rightLink}
                >
                  {"Login"}
                </Button>
                <Button
                  onClick={() => modalHandler("Register")}
                  className={clsx(classes.rightLink, classes.signUpButton)}
                >
                  {"Sign Up"}
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          {/* <div className={classes.placeholder} /> */}
          <Suspense fallback={<CircularLoader />}>
            <AuthModal
              open={open.modal}
              handleClose={modalHandler}
              type={formType}
            />
          </Suspense>
        </div>
      )}
    </Spring>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
