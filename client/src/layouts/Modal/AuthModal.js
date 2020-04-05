import React, { Suspense, lazy } from "react";
import { Button, Dialog, DialogActions, Slide } from "@material-ui/core";
import ModalToolbar from "./components/ModalToolbar";
import { CircularLoader } from "../Loader/Loaders";
import { isMobile } from "react-device-detect";

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

export default function AuthModal({ open, handleClose, type }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullScreen={isMobile ? true : false}
        keepMounted
        onClose={handleClose}
        aria-labelledby="auth-dialog"
        aria-describedby="auth-dialog"
      >
        <ModalToolbar closeModal={handleClose} />
        <Suspense fallback={<CircularLoader />}>
          {type === "Login" ? (
            <Login />
          ) : type === "Register" ? (
            <Register />
          ) : (
            ""
          )}
        </Suspense>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
