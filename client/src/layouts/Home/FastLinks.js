import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarToday as CalendarTodayIcon,
  AccountBox as AccountBoxIcon,
  FitnessCenter as FitnessCenterIcon,
  Group as GroupIcon
} from "@material-ui/icons";
import { Fab } from "@material-ui/core";

const styles = {
  root: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    height: "100%",
    marginBottom: 20
  },
  linkBtn: {
    margin: 5
  },
  button: {
    width: 150
  },
  icon: { marginRight: 5 }
};

export const FastLinks = () => {
  return (
    <div style={styles.root}>
      <Link style={styles.linkBtn} to="./dashboard/schedule">
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          aria-label="schedule"
          style={styles.button}
        >
          <CalendarTodayIcon style={styles.icon} />
          Scheduele
        </Fab>
      </Link>
      <Link style={styles.linkBtn} to="./dashboard/workouts">
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          aria-label="workouts"
          style={styles.button}
        >
          <FitnessCenterIcon style={styles.icon} />
          Workouts
        </Fab>
      </Link>
      <Link style={styles.linkBtn} to="./dashboard/clients">
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          aria-label="clients"
          style={styles.button}
        >
          <GroupIcon style={styles.icon} />
          Clients
        </Fab>
      </Link>
      <Link style={styles.linkBtn} to="./dashboard/account">
        <Fab
          variant="extended"
          size="large"
          color="secondary"
          aria-label="account"
          style={styles.button}
        >
          <AccountBoxIcon style={styles.icon} />
          Account
        </Fab>
      </Link>
    </div>
  );
};
