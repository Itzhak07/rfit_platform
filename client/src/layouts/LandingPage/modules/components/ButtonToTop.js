import React from "react";
import { animateScroll as scroll } from "react-scroll";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {makeStyles, Fab } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    right: 20,
    bottom: 50
  }
});

export const ButtonToTop = () => {
  const classes = useStyles();

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Fab
      color="secondary"
      aria-label="toTop"
      size="medium"
      className={classes.root}
      onClick={scrollToTop}
    >
      <ArrowDropUpIcon color="action" fontSize="large" />
    </Fab>
  );
};
