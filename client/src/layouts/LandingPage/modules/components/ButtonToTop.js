import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { makeStyles, Fab } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    right: 20,
    bottom: 50
  }
});

export const ButtonToTop = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setScrollPos(document.body.getBoundingClientRect().top);
  };

  const classes = useStyles();

  const btnVisability = {
    hide: {
      opacity: 0,
      transition: "all 0.2s ease"
    },
    show: {
      opacity: 1,
      transition: "all 0.2s ease"
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Fab
      style={scrollPos < 0 ? btnVisability.show : btnVisability.hide}
      color="secondary"
      aria-label="toTop"
      size="large"
      className={classes.root}
      onClick={scrollToTop}
    >
      <ArrowDropUpIcon color="action" fontSize="large" />
    </Fab>
  );
};
