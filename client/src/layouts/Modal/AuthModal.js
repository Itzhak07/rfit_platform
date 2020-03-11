import React, { Suspense, lazy } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Slide
} from "@material-ui/core";

const Login = lazy(() =>
  import(/* webpackChunkName: "LoginForm"*/ "../../components/forms/Login")
);
const Register = lazy(() =>
  import(
    /* webpackChunkName: "RegisterForm"*/ "../../components/forms/Register"
  )
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AuthModal({ open, handleCLose, type }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCLose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Suspense fallback={<CircularProgress />}>
          {type === "Login" ? (
            <Login />
          ) : type === "Register" ? (
            <Register />
          ) : (
            ""
          )}
        </Suspense>

        <DialogActions>
          <Button onClick={handleCLose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
