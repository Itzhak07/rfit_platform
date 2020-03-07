/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import React, { lazy, Suspense } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";

import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  TodayButton,
  DateNavigator
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Notes from "@material-ui/icons/Notes";
import Close from "@material-ui/icons/Close";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Create from "@material-ui/icons/Create";
import { ConfirmationDialog } from "@devexpress/dx-react-scheduler-material-ui";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout
} from "../actions/workoutActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { Info } from "@material-ui/icons";
const ErrorAlert = lazy(() => import("./ErrorAlert"));
const Modal = lazy(() =>
  import(/* webpackChunkName: "Modal"*/ "../layouts/Modal")
);

const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0
  },
  header: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: "right"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2)
  },
  button: {
    marginLeft: theme.spacing(2)
  },
  picker: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0
    },
    width: "50%"
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0)
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2)
  },
  textField: {
    width: "100%"
  }
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {}
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes
    };
    this.setState({
      appointmentChanges: nextChanges
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges()
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {}
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
      activeClients,
      data
    } = this.props;

    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges
    };

    const clientsOptions = activeClients.map(client => {
      return {
        id: client._id,
        text: client.firstName + " " + client.lastName
      };
    });

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment("added")
      : () => this.commitAppointment("changed");

    const textEditorProps = field => ({
      variant: "outlined",
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value
        }),
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField
    });

    const clientEditorProps = field => ({
      variant: "outlined",
      value: displayAppointmentData.client,
      label: displayAppointmentData.client,
      className: classes.textField
    });

    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date =>
        this.changeAppointment({
          field: [field],
          changes: date
            ? date.toDate()
            : new Date(displayAppointmentData[field])
        }),
      inputVariant: "outlined",
      format: "DD/MM/YYYY HH:mm",
      onError: () => null
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {}
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton className={classes.closeButton} onClick={cancelChanges}>
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <Autocomplete
                options={clientsOptions}
                placeholder=""
                getOptionLabel={option => option.text}
                {...clientEditorProps("title")}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={
                      displayAppointmentData.title
                        ? displayAppointmentData.title
                        : ""
                    }
                    variant="outlined"
                    placeholder="client"
                  />
                )}
                onChange={(event, newValue) => {
                  const change = {
                    field: "title",
                    changes: newValue ? newValue.id : ""
                  };
                  this.changeAppointment(change);
                }}
                clearOnEscape
              />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Start Date"
                  {...pickerEditorProps("startDate")}
                />
                <KeyboardDateTimePicker
                  label="End Date"
                  {...pickerEditorProps("endDate")}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField {...textEditorProps("notes")} multiline rows="6" />
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment("deleted");
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? "Create" : "Save"}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, {
  name: "AppointmentFormContainer"
})(AppointmentFormContainerBasic);

const styles = theme => ({
  addButton: {
    position: "absolute",
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  }
});

/* eslint-disable-next-line react/no-multi-comp */
class Schedule2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.workouts,
      activeClients: this.props.activeClients,
      currentDate: new Date(),
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 8,
      endDayHour: 22,
      isNewAppointment: false,
      open: false,
      modalBody: "",
      alerts: this.props.alerts
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(
      this
    );

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(
      this
    );
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        activeClients,
        addedAppointment,
        isNewAppointment,
        previousAppointment
      } = this.state;

      const currentAppointment =
        this.props.workouts.filter(
          appointment =>
            editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        activeClients: activeClients,
        data: data,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment
      };
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState(state => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(
        appointment => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState(state => {
      let { data } = state;
      if (added) {
        return this.props.createWorkout(added);
      }

      if (changed) {
        const id = Object.keys(changed)[0];
        const update = Object.values(changed)[0];

        if (!("title" in update)) {
          update.id = id;
        } else {
          if (update["title"].indexOf(" ") >= 0) {
            delete update["title"];
          } else {
            update["client"] = update["title"];
            delete update["title"];
          }
        }
        console.log(update);

        this.props.updateWorkout(update);
      }
      if (deleted !== undefined) {
        this.props.deleteWorkout(deleted);
      }
      return { data, addedAppointment: {} };
    });
  }

  modalOpen(workoutData) {
    this.setState({ ...this.state, open: true, modalBody: workoutData });
  }

  modalClose = () => {
    this.setState({ ...this.state, open: false });
  };

  currentDateChange = currentDate => {
    this.setState({ ...this.state, currentDate: currentDate });
  };

  render() {
    const {
      currentDate,
      editingFormVisible,
      startDayHour,
      endDayHour,
      open,
      modalBody
    } = this.state;
    const { classes } = this.props;

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

    const Header = withStyles(
      {},
      { name: "Header" }
    )(({ children, appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}
      >
        <IconButton
          onClick={() => this.modalOpen(appointmentData.notes)}
          className={classes.commandButton}
        >
          <Info />
        </IconButton>
      </AppointmentTooltip.Header>
    ));

    return (
      <Paper>
        {this.props.alerts ? (
          <Suspense fallback={<CircularProgress />}>
            {this.props.alerts.map(alert => {
              return alert.msg.map(err => {
                return <ErrorAlert message={err} />;
              });
            })}
          </Suspense>
        ) : (
          ""
        )}
        <Scheduler data={this.props.workouts} height={"100%"}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={60}
          />
          <MonthView />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
            headerComponent={Header}
          />
          <Toolbar
            {...(this.props.loading
              ? { rootComponent: ToolbarWithLoading }
              : null)}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <DragDropProvider />
        </Scheduler>

        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1)
            });
          }}
        >
          <AddIcon />
        </Fab>

        <Suspense fallback={<CircularProgress />}>
          <Modal
            open={open}
            handleClose={this.modalClose}
            modalBody={modalBody}
            modalTitle={"Workout Info:"}
          />
        </Suspense>
      </Paper>
    );
  }
}

Schedule2.propTypes = {
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
})(withStyles(styles, { name: "Schedule2" })(Schedule2));