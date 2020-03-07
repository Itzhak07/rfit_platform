import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip
} from "@devexpress/dx-react-scheduler-material-ui";
import WeightlifterPic from "../assets/images/weightlifter.png";

import { Typography, LinearProgress } from "@material-ui/core";

export default function DaySchedule({ workouts, loading }) {
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

  return (
    <Paper style={styles.root} elevation={3}>
      <Typography style={styles.title}>Today's Schedule</Typography>
      {loading ? <LinearProgress variant="query" /> : ""}
      {!loading && workouts.length === 0 ? (
        <div style={styles.wrapper}>
          <Typography style={styles.message}>No Appointments Today!</Typography>
          <img src={WeightlifterPic} title="weightlifter" alt="weightlifter" style={styles.img} />
        </div>
      ) : (
        <Scheduler data={workouts}>
          <DayView startDayHour={8} endDayHour={22} cellDuration={60} />
          <Appointments />
          <AppointmentTooltip />
        </Scheduler>
      )}
    </Paper>
  );
}
