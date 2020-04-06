import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import productCurvyLines from "../../../../assets/images/productCurvyLines.png";

import {
  Dashboard as DashboardIcon,
  PeopleAlt as PeopleAltIcon,
  EventAvailable as EventAvailableIcon,
  Mail as MailIcon,
} from "@material-ui/icons/";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: " #7fc7d9;",
  },
  container: {
    padding: 50,
    display: "flex",
    position: "relative",
  },
  itemsContainer: {
    zIndex: 1,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
    transition: "all 0.3s ease",
    "&:hover": {
      transform: " scale(1.2)",
      transition: "all 0.3s ease",
    },
  },
  image: {
    height: 100,
    width: 100,
    color: "white",
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: "center",
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    zIndex: 0,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <img
          src={productCurvyLines}
          className={classes.curvyLines}
          alt="curvy-lines"
        />
        <Grid className={classes.itemsContainer} container spacing={5}>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
              <DashboardIcon className={classes.image} />
              <Typography variant="h6" className={classes.title}>
                Smart Dashboard
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
              <EventAvailableIcon className={classes.image} />
              <Typography variant="h6" className={classes.title}>
                Schedule Control
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
              <PeopleAltIcon className={classes.image} />
              <Typography variant="h6" className={classes.title}>
                Clients Management
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
              <MailIcon className={classes.image} />
              <Typography variant="h6" className={classes.title}>
                Messaging Channels
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
