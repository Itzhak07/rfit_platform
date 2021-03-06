import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../components/Typography";
import HelpIcon from "@material-ui/icons/Help";
import { Link } from "react-scroll";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9)
  },
  button: {
    border: "4px solid currentColor",
    borderRadius: 0,
    height: "auto",
    padding: theme.spacing(2, 5)
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  buoy: {
    width: 50,
    height: 50
  }
});

function GetInTouch(props) {
  const { classes } = props;

  return (
    <Container className={classes.root} component="section">
      <Link
        to="contact-section"
        spy={true}
        smooth={true}
        offset={-100}
        duration={500}
      >
        <Button className={classes.button}>
          <Typography variant="h4" component="span">
            Got any questions? Need help?
          </Typography>
        </Button>
      </Link>
      <Typography variant="subtitle1" className={classes.link}>
        We are here to help. Get in touch!
      </Typography>
      <HelpIcon className={classes.buoy} alt="buoy" />
    </Container>
  );
}

GetInTouch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GetInTouch);
