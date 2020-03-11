import React from "react";
import { animateScroll as scroll } from "react-scroll";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    right: 20,
    bottom: 50,
    // background: "#ff3366;",
    borderRadius: 120,
    height: 60,
    width: 60
  }
});

export const ButtonToTop = () => {
  const classes = useStyles();

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Button
      color="secondary"
      variant="contained"
      className={classes.root}
      onClick={scrollToTop}
    >
      <ArrowDropUpIcon color="action" fontSize="large" />
    </Button>
  );
};
