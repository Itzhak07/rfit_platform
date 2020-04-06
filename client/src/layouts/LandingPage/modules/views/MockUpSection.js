import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../components/Typography";
import Mockup from "../../../../assets/images/mockup.png";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap-reverse",
    justifyContent: "space-evenly",
    margin: "50px 0",
  },

  images: {
    width: "100%",
    padding: 16,
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    maxWidth: 900,

    padding: 0,
    borderRadius: 0,
  },
  texts: {
    maxWidth: 700,
    padding: 20,
  },
  pargraph: {
    fontSize: 24,
  },
  bolder: {
    fontWeight: 500,
    color: "#3f51b5;",
  },
});

function MockUpSection(props) {
  const { classes } = props;

  return (
    <div className={classes.root} component="section">
      <div className={classes.imageWrapper}>
        <img
          className={classes.images}
          src={Mockup}
          title="mockup"
          alt="mockup"
        />
      </div>
      <div className={classes.texts}>
        <Typography
          variant="h2"
          marked="center"
          align="center"
          component="h2"
          gutterBottom
        >
          Everything you need in one place
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          paragraph
          className={classes.pargraph}
        >
          Every trainer has a very tight schedule,
          <br />
          whether if there's a training session, programming appointment, client
          call and etc...
          <br />
          the <span className={classes.bolder}>RFit Platform</span> was created
          to provide a <span className={classes.bolder}>SIMPLE</span> but{" "}
          <span className={classes.bolder}>POWERFUL</span> solution to manage it
          all.
          <br />
          Free of charge and unlimited of use, the RFit Platform is here to
          assit your every need.
        </Typography>
      </div>
    </div>
  );
}

MockUpSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MockUpSection);
