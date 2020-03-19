import React from "react";
import notFoundBg from "../../assets/images/404.jpg";
import notFoundLeft from "../../assets/images/404-left.jpg";
import notFoundRight from "../../assets/images/404-right.jpg";
import { Hidden } from "@material-ui/core";

const styles = {
  root: {
    color: "#666",
    margin: -20,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    background: "#151515",
  },
  bgContainer: {
    background: "#151515",
    width: "100%",
    paddingTop: 150
  },
  bg: {
    maxWidth: 600,
    maxHeight: 400,
    marginBottom: 50
  },
  side_bg: {
    height: "100vh",
    width: "100%"
  }
};
export const NotFound = () => {
  return (
    <div style={styles.root}>
      <Hidden implementation="css" mdDown>
        <img
          src={notFoundLeft}
          title="left_bg"
          alt="left_bg"
          style={styles.side_bg}
        />
      </Hidden>
      <div style={styles.bgContainer}>
        <img
          src={notFoundBg}
          style={styles.bg}
          title="center_bg"
          alt="center_bg"
        />
        <h2>THIS PAGE IS NOT FULLY ARMED AND OPERATIONAL.</h2>
        <h1>TRY SOMETHING ELSE?</h1>
      </div>
      <Hidden implementation="css" mdDown>
        <img
          src={notFoundRight}
          title="right_bg"
          alt="right_bg"
          style={styles.side_bg}
        />
      </Hidden>
    </div>
  );
};
