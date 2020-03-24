import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiSnackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {
  Info as InfoIcon,
  CheckCircleOutline as CheckCircleOutlineIcon
} from "@material-ui/icons";

const styles = theme => ({
  content: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    flexWrap: "inherit",
    [theme.breakpoints.up("md")]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4
    }
  },
  contentMessage: {
    fontSize: 16,
    display: "flex",
    alignItems: "center"
  },
  contentAction: {
    paddingLeft: theme.spacing(2)
  },
  info: {
    flexShrink: 0,
    marginRight: theme.spacing(2)
  },
  close: {
    padding: theme.spacing(1)
  }
});

function Transition(props) {
  return <Slide {...props} direction="down" />;
}

function Snackbar(props) {
  const { classes, onClose, message, type, ...other } = props;

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={3000}
      transition={Transition}
      ContentProps={{
        classes: {
          root: classes.content,
          message: classes.contentMessage,
          action: classes.contentAction
        }
      }}
      message={
        <React.Fragment>
          {type === "error" ? (
            <InfoIcon className={classes.info} />
          ) : type === "success" ? (
            <CheckCircleOutlineIcon className={classes.info} />
          ) : (
            ""
          )}

          <span>{message}</span>
        </React.Fragment>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
      {...other}
    />
  );
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  SnackbarContentProps: PropTypes.object
};

export default withStyles(styles)(Snackbar);
