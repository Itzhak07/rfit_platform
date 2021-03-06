import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Link } from "react-scroll";
import { Spring, config } from "react-spring/renderprops";

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
      minHeight: 500,
      maxHeight: 1300
    }
  },
  container: {
    margin: "0 auto",
    padding: "100px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2
  },
  arrowDown: {
    position: "relative",
    top: 100,
    bottom: theme.spacing(2),
    width: 100,
    height: 100,
    color: "white",
    cursor: "pointer"
  }
});

function ProductHeroLayout(props) {
  const { backgroundClassName, children, classes } = props;

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={config.slow}>
          {props => (
            <div
              style={props}
              className={clsx(classes.background, backgroundClassName)}
            />
          )}
        </Spring>
        {/* <div className={clsx(classes.background, backgroundClassName)} /> */}
        <Link
          to="about-section"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <ArrowDownwardIcon className={classes.arrowDown} />
        </Link>
      </div>
    </section>
  );
}

ProductHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHeroLayout);
