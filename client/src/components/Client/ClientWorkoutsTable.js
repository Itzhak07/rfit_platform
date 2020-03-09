import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "moment-timezone";
import MaterialTable from "material-table";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    overflowX: "auto"
  },
  table: {
    maxWidth: 600,
    paddind: 80
  }
});

export default function ClientWorkoutsTable({ workouts }) {
  const columns = [
    { title: "Date", field: "date", type: "date" },
    { title: "Start", field: "startDate", type: "time" },
    { title: "End", field: "endDate", type: "time" },
    { title: "Workout", field: "notes" }
  ];
  const data = workouts;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Anakin's Workouts History:
        "
        className={classes.table}
        columns={columns}
        data={data}
        onRowClick={(event, rowData) => {}}
        options={{
          search: false
        }}
      />
    </div>
  );
}
