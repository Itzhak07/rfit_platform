import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DragDropProvider
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  EditingState,
  IntegratedEditing
} from "@devexpress/dx-react-scheduler";

import WeightlifterPic from "../../assets/images/weightlifter.png";
import { Typography, LinearProgress, Paper } from "@material-ui/core";
import { deleteWorkout, updateWorkout } from "../../actions/workoutActions";

const DaySchedule = ({ today, loading, deleteWorkout, updateWorkout }) => {
  const styles = {
    root: {
      maxWidth: 400,
      height: 800
    },
    title: {
      margin: 20,
      fontSize: 20
    },
    message: {
      margin: 20,
      fontSize: 32
    },
    wrapper: {
      display: "flex",
      flexFlow: "column wrap",
      alignItems: "center"
    },
    img: {
      width: 300,
      marginTop: 50
    }
  };
  const commitChanges = ({ added, changed, deleted }) => {
    if (deleted !== undefined) {
      deleteWorkout(deleted);
    }

    if (changed) {
      const id = Object.keys(changed)[0];
      const update = Object.values(changed)[0];
      update.id = id;
      updateWorkout(update);
    }
  };

  return (
    <Paper style={styles.root} elevation={3}>
      <Typography style={styles.title}>Today's Schedule </Typography>

      {loading ? <LinearProgress variant="query" /> : ""}
      {!loading && today.length === 0 ? (
        <div style={styles.wrapper}>
          <Typography style={styles.message}>No Appointments Today!</Typography>
          <img
            src={WeightlifterPic}
            title="weightlifter"
            alt="weightlifter"
            style={styles.img}
          />
        </div>
      ) : (
        <Scheduler data={today}>
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />
          <DayView startDayHour={8} endDayHour={22} cellDuration={60} />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showDeleteButton />
          <DragDropProvider />
        </Scheduler>
      )}
    </Paper>
  );
};

DaySchedule.propTypes = {
  today: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  updateWorkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  today: state.workouts.today,
  loading: state.workouts.loading
});

export default connect(mapStateToProps, { deleteWorkout, updateWorkout })(
  DaySchedule
);
