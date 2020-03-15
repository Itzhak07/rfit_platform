import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarToday as CalendarTodayIcon,
  AccountBox as AccountBoxIcon
} from "@material-ui/icons";
import { Button } from "@material-ui/core";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start"
  },
  linkBtn: {
    margin: 5
  }
};

export const FastLinks = () => {
  return (
    <div style={styles.root}>
      <Link style={styles.linkBtn} to="./dashboard/schedule">
        <Button variant="outlined" startIcon={<CalendarTodayIcon />}>
          Scheduele
        </Button>
      </Link>
      <Link style={styles.linkBtn} to="./dashboard/account">
        <Button variant="outlined" startIcon={<AccountBoxIcon />}>
          Account
        </Button>
      </Link>
    </div>
  );
};
