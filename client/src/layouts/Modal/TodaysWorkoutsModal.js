import React, { forwardRef, lazy, Suspense } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  CircularProgress
} from "@material-ui/core";
const SimpleWorkoutsTable = lazy(() =>
  import(
    /* webpackChunkName: "SimpleWorkoutsTable"*/ "../../components/Workouts/SimpleWorkoutsTable"
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
          <Suspense fallback={<CircularProgress />}>
            {data.length !== 0 ? (
              <SimpleWorkoutsTable data={data} />
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
