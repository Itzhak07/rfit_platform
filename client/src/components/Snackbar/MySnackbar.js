import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MySnackbar({
  isNewWorkout,
  isNewClient,
  isClientUpdate,
  isNewMessage
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isNewWorkout) {
      setMessage("Workout has been added!");
      setOpen(true);
    }
    if (isNewClient) {
      setMessage("Client has been added!");
      setOpen(true);
    }
    if (isClientUpdate) {
      setMessage("Client has been updated!");
      setOpen(true);
    }
    if (isNewMessage) {
      setMessage("Message has been sent!");
      setOpen(true);
    }
  }, [isNewClient, isNewWorkout, isClientUpdate, isNewMessage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

MySnackbar.propTypes = {
  isNewWorkout: PropTypes.bool.isRequired,
  isNewClient: PropTypes.bool.isRequired,
  isClientUpdate: PropTypes.bool.isRequired,
  isNewMessage: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isNewWorkout: state.workouts.isNewWorkout,
  isNewClient: state.clients.isNewClient,
  isClientUpdate: state.clients.isClientUpdate,
  isNewMessage: state.messages.isNewMessage
});

export default connect(mapStateToProps, {})(MySnackbar);
