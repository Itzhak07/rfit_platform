import React, { useState, lazy, Suspense, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout
} from "../actions/workoutActions";
import {
  ViewState,
  EditingState,
  IntegratedEditing
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  Paper,
  withStyles,
  IconButton,
  LinearProgress,
  TextField,
  CircularProgress
} from "@material-ui/core";
import { Info, TextFields } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ErrorAlert = lazy(() => import("./ErrorAlert"));
const Modal = lazy(() =>
  import(/* webpackChunkName: "Modal"*/ "../layouts/Modal")
);

const Schedule = ({
  workouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  activeClients,
  alerts,
  loading
}) => {
  const [state, setState] = useState({
    data: workouts,
    currentDate: new Date(),
    currentClient: ""
  });

  const { currentDate, currentClient, data } = state;
  useEffect(() => {
    setState({ ...state, data: workouts });
  }, [workouts]);

  const [appointmentsAction, setAppointmentsAction] = useState({
    addedAppointment: {},
    appointmentChanges: {},
    editingAppointmentId: undefined
  });
  const [open, setOpen] = useState(false);
  const [modalBody, setModalBody] = useState();

  const currentDateChange = currentDate => {
    setState({ ...state, currentDate: currentDate });
  };

  const modalOpen = workoutData => {
    setOpen(true);
    setModalBody(workoutData);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const commitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      return createWorkout(added);
    }

    if (changed) {
      const id = Object.keys(changed)[0];
      const update = Object.values(changed)[0];
      update.id = id;

      if (update["title"]) {
        update["client"] = update["title"];
        delete update["title"];
      }
      updateWorkout(update);
    }

    if (deleted !== undefined) {
      deleteWorkout(deleted);
    }
    return;
  };
  const { appointmentChanges, addedAppointment } = appointmentsAction;

  const changeAddedAppointment = addedAppointment => {
    setAppointmentsAction({
      ...appointmentsAction,
      addedAppointment: addedAppointment
    });
  };

  const changeAppointmentChanges = appointmentChanges => {
    setAppointmentsAction({
      ...appointmentsAction,
      appointmentChanges: appointmentChanges
    });
  };

  const CustomForm = props => {
    const clientsOptions = activeClients.map(client => {
      return {
        id: client._id,
        text: client.firstName + " " + client.lastName
      };
    });

    const onClientChange = nextValue => {
      const { id, text } = nextValue;
      setState({ ...state, currentClient: text });
      props.onValueChange(id);
    };

    if (props.type === "titleTextEditor") {
      return (
        <Autocomplete
          options={clientsOptions}
          placeholder=""
          getOptionLabel={option => option.text}
          renderInput={params => (
            <TextField
              {...params}
              label={currentClient ? currentClient : props.value}
              variant="outlined"
            />
          )}
          onChange={(event, newValue) => {
            onClientChange(newValue);
          }}
          clearOnEscape
        />
      );
    }
    if (props.type === "multilineTextEditor") {
      return (
        <div>
          <AppointmentForm.Label text="Workout" type="title" />
          <AppointmentForm.TextEditor {...props} />
        </div>
      );
    }

    return <AppointmentForm.TextEditor {...props} />;
  };

  // Toolbar Loader//

  const toolBarStyle = {
    toolbarRoot: {
      position: "relative"
    },
    progress: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      left: 0
    }
  };
  const ToolbarWithLoading = withStyles(toolBarStyle, { name: "Toolbar" })(
    ({ children, classes, ...restProps }) => (
      <div className={classes.toolbarRoot}>
        <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
        <LinearProgress className={classes.progress} />
      </div>
    )
  );
  ////

  // ToolTip Header //

  const Header = withStyles(
    {},
    { name: "Header" }
  )(({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <IconButton
        onClick={() => modalOpen(appointmentData.notes)}
        className={classes.commandButton}
      >
        <Info />
      </IconButton>
    </AppointmentTooltip.Header>
  ));
  ////

  return (
    <div>
      <Paper>
        {alerts ? (
          <Suspense fallback={<CircularProgress />}>
            {alerts.map(alert => {
              return alert.msg.map(err => {
                return <ErrorAlert message={err} />;
              });
            })}
          </Suspense>
        ) : (
          ""
        )}

        <Scheduler data={data} height={"100vh"}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={currentDateChange}
          />
          <EditingState
            onCommitChanges={commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={changeAppointmentChanges}
            // editingAppointmentId={editingAppointmentId}
            // onEditingAppointmentIdChange={changeEditingAppointmentId}
          />
          <IntegratedEditing />
          <WeekView startDayHour={8} endDayHour={22} cellDuration={60} />
          <ConfirmationDialog />
          <Toolbar
            {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
          />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showDeleteButton
            showOpenButton
            headerComponent={Header}
            AppointmentMeta
          />
          <AppointmentForm 
          textEditorComponent={CustomForm}
           />
        </Scheduler>
      </Paper>
      <Suspense fallback={<CircularProgress />}>
        <Modal
          open={open}
          handleClose={modalClose}
          modalBody={modalBody}
          modalTitle={"Workout Info:"}
        />
      </Suspense>
    </div>
  );
};

Schedule.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  updateWorkout: PropTypes.func.isRequired,
  workouts: PropTypes.array.isRequired,
  clients: PropTypes.array.isRequired,
  activeClients: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  workouts: state.workouts.workouts,
  clients: state.clients.clients,
  activeClients: state.clients.active,
  loading: state.workouts.loading,
  alerts: state.alerts.alerts
});

export default connect(mapStateToProps, {
  createWorkout,
  deleteWorkout,
  updateWorkout
})(Schedule);
