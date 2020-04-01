import React, { forwardRef, lazy, Suspense } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide
} from "@material-ui/core";
import { CircularLoader } from "../Loader/Loaders";
import { isMobile } from "react-device-detect";

const TodaysAppointments = lazy(() =>
  import(
    /* webpackChunkName: "SimpleWorkoutsTable"*/ "../../components/Workouts/TodaysAppointments"
  )
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TodaysWorkoutsModal({
  handleClose,
  open,
  data,
  title
}) {
  return (
    <div>
      <Dialog
        fullScreen={isMobile ? true : false}
        maxWidth="lg"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <Suspense fallback={<CircularLoader />}>
            {data.length !== 0 ? (
              <TodaysAppointments data={data} />
            ) : (
              <h1>No Appointments For Today!</h1>
            )}
          </Suspense>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
