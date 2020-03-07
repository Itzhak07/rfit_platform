import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "../components/TextField";
import Snackbar from "../components/Snackbar";
import Button from "../components/Button";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    width: "100%",
    marginBottom: 0,
    display: "flex",
    textAlign: "center"
  },
  cardWrapper: {
    zIndex: 1,
    width: "100%",
    margin: "auto",
    background: "#28282a"
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#28282a",
    padding: "30px 0",
    width: "100%"
  },
  cardContent: {
    maxWidth: "100%"
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    padding: "0 20px"
  },
  button: {
    width: 200
  },
  imagesWrapper: {
    position: "relative"
  },
  imageDots: {
    position: "absolute",
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: "100%",
    background: "url(/static/onepirate/productCTAImageDots.png)"
  },
  image: {
    position: "absolute",
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: 600
  },
  title: {
    color: "white",
    fontSize: 32
  }
});

function Subscribe(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className={classes.root} component="section">
      <Grid className={classes.cardWrapper}>
        <div className={classes.card}>
          <form onSubmit={handleSubmit} className={classes.cardContent}>
            <Typography
              variant="h3"
              component="h3"
              gutterBottom
              className={classes.title}
            >
              Subscribe to our newsletter
            </Typography>

            <TextField
              noBorder
              className={classes.textField}
              placeholder="Your email"
              required
            />
            <br />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Keep me updated
            </Button>
          </form>
        </div>
      </Grid>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="We will send you our best offers, once a week."
      />
    </Container>
  );
}

Subscribe.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Subscribe);
