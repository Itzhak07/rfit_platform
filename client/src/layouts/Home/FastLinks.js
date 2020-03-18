import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarToday as CalendarTodayIcon,
  AccountBox as AccountBoxIcon,
  FitnessCenter as FitnessCenterIcon,
  Group as GroupIcon
} from "@material-ui/icons";
import { Button } from "@material-ui/core";
const styles = {
  root: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    height: "100%",
    marginBottom: 10
  },
  linkBtn: {
    margin: 5
  },
  button: {
    width: 150
  }
};

export const FastLinks = () => {
  return (
    <div style={styles.root}>
      <Link style={styles.linkBtn} to="./dashboard/schedule">
        <Button
          variant="contained"
          color="secondary"
          style={styles.button}
          startIcon={<CalendarTodayIcon />}
        >
          Scheduele
        </Button>
      </Link>
      <Link style={styles.linkBtn} to="./dashboard/workouts">
        <Button
          variant="contained"
          color="secondary"
          style={styles.button}
          startIcon={<FitnessCenterIcon />}
        >
          Workouts
        </Button>
      </Link>
      <Link style={styles.linkBtn} to="./dashboard/clients">
        <Button
          variant="contained"
          color="secondary"
          style={styles.button}
          startIcon={<GroupIcon />}
        >
          Clients
        </Button>
      </Link>
      <Link style={styles.linkBtn} to="./dashboard/account">
        <Button
          variant="contained"
          color="secondary"
          style={styles.button}
          startIcon={<AccountBoxIcon />}
        >
          Account
        </Button>
      </Link>
    </div>
  );
};
