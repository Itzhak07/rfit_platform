import React, { Suspense, lazy } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { isMobile } from "react-device-detect";

const AddClient = lazy(() =>
  import(
    /* webpackChunkName: "AddClientForm"*/ "../../components/forms/AddClient"
  )
);

const EditClient = lazy(() =>
  import(
    /* webpackChunkName: "EditClientForm"*/ "../../components/forms/EditClient"
  )
);

const AddWorkout = lazy(() =>
  import(
    /* webpackChunkName: "AddWorkoutForm"*/ "../../components/forms/AddWorkout"
  )
);

const SendEmail = lazy(() =>
  import(
    /* webpackChunkName: "SendMailForm"*/ "../../layouts/Messages/components/SendMailForm"
  )
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddModal({ open, closeModal, type }) {
  const modalToolbar = (
    <AppBar style={{ position: "relative" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={closeModal}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        {/* <Typography variant="h6">Sound</Typography>
        <Button autoFocus color="inherit" onClick={closeModal}>
          save
        </Button> */}
      </Toolbar>
    </AppBar>
  );

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullScreen={isMobile ? true : false}
        maxWidth="lg"
      >
        {/* {isMobile ? modalToolbar : ""} */}
        {modalToolbar}
        <Suspense fallback={<CircularProgress />}>
          {type === "Client" ? (
            <AddClient closeModal={closeModal} />
          ) : type === "Workout" ? (
            <AddWorkout closeModal={closeModal} />
          ) : type === "editClient" ? (
            <EditClient closeModal={closeModal} />
          ) : type === "sendEmail" ? (
            <SendEmail closeModal={closeModal} />
          ) : (
            ""
          )}
        </Suspense>

        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
