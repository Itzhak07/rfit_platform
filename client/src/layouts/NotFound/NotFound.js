import React from "react";
import notFoundBg from "../../assets/images/404.jpg";
import notFoundLeft from "../../assets/images/404-left.jpg";
import notFoundRight from "../../assets/images/404-right.jpg";

const styles = {
  root: {
    color: "#666",
    margin: -20,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    height: "100vh"
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
  h1: {},
  h2: {}
};
export const NotFound = () => {
  return (
    <div style={styles.root}>
      <img src={notFoundLeft} title="left_bg" alt="left_bg" />
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
      <img src={notFoundRight} title="right_bg" alt="right_bg" />
    </div>
  );
};
