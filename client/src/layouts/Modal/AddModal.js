import React, { Suspense, lazy } from "react";
import { Button, Dialog, DialogActions, Slide } from "@material-ui/core";
import { CircularLoader } from "../Loader/Loaders";
import { isMobile } from "react-device-detect";
import ModalToolbar from "./components/ModalToolbar";

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
        <ModalToolbar closeModal={closeModal} />
        <Suspense fallback={<CircularLoader />}>
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
