import React, { useState, lazy, Suspense, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import {
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  FitnessCenter as FitnessCenterIcon,
  Email as EmailIcon
} from "@material-ui/icons/";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";

const AddModal = lazy(() =>
  import(/* webpackChunkName: "AuthModal"*/ "../../layouts/Modal/AddModal")
);

const useStyles = makeStyles({
  root: {
    position: "fixed",
    right: 32,
    bottom: 24,
    zIndex: 2
  }
});

export default function MenuButton({
  addClient,
  editClient,
  addWorkout,
  sendEmail
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formType, setFormType] = useState();
  const classes = useStyles();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if ((sendEmail, editClient)) {
      return setActions([
        { icon: <EditIcon />, name: "Edit Client", form: "editClient" },
        { icon: <EmailIcon />, name: "New Message", form: "sendEmail" }
      ]);
    }
    if (addClient) {
      return setActions([
        { icon: <PersonAddIcon />, name: "New Client", form: "Client" }
      ]);
    }
    if (editClient) {
      return setActions([
        { icon: <EditIcon />, name: "Edit Client", form: "editClient" },
        { icon: <EmailIcon />, name: "New Message", form: "sendEmail" }
      ]);
    }
    if (addWorkout) {
      return setActions([
        { icon: <FitnessCenterIcon />, name: "New Workout", form: "Workout" }
      ]);
    }
    if (sendEmail) {
      return setActions([
        { icon: <EmailIcon />, name: "New Message", form: "sendEmail" }
      ]);
    } else {
      return setActions([
        { icon: <PersonAddIcon />, name: "New Client", form: "Client" },
        { icon: <FitnessCenterIcon />, name: "New Workout", form: "Workout" },
        { icon: <EmailIcon />, name: "New Message", form: "sendEmail" }
      ]);
    }
  }, [addWorkout, addClient, editClient, sendEmail]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const modalOpen = type => {
    setOpenModal(true);
    setFormType(type);
    setOpen(false);
  };

  const modalClose = () => {
    setOpenModal(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial Button"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={"up"}
        FabProps={{ color: "secondary" }}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => modalOpen(action.form)}
          />
        ))}
      </SpeedDial>
      <Suspense fallback={<CircularProgress />}>
        <AddModal open={openModal} closeModal={modalClose} type={formType} />
      </Suspense>
    </div>
  );
}
