import React, { Suspense, lazy } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Slide
} from "@material-ui/core";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddModal({ open, closeModal, closeMenu, type }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Suspense fallback={<CircularProgress />}>
          {type === "Client" ? (
            <AddClient closeModal={closeModal} />
          ) : type === "Workout" ? (
            <AddWorkout closeModal={closeModal} />
          ) : type === "editClient" ? (
            <EditClient closeModal={closeModal} />
          ) : (
            ""
          )}
        </Suspense>

        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
