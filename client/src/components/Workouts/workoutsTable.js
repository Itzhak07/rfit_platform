import React, { useState, useEffect, lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "moment-timezone";
import MaterialTable from "material-table";
import { CircularProgress } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
const ErrorAlert = lazy(() =>
  import(/* webpackChunkName: "ErrorAlert"*/ "../Alerts/ErrorAlert")
);

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 400
  }
});

export default function WorkoutsTable({
  workouts,
  clients,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  alerts
}) {
  const [state, setState] = useState({
    columns: [],
    data: []
  });

  const classes = useStyles();

  useEffect(() => {
    const clientsLookUp = clients.reduce(
      (acc, cur) => ({ ...acc, [cur._id]: cur.firstName + " " + cur.lastName }),
      {}
    );
    setState({
      columns: [
        {
          title: "Name",
          field: "client",
          lookup: clientsLookUp,
          render: rowData => (
            <Link to={"/dashboard/clients/" + rowData.client}>
              <Chip size="small" label={`${rowData.title}`} />
            </Link>
          )
        },
        { title: "Date", field: "date", type: "date" },
        { title: "Start", field: "startDate", type: "time", filtering: false },
        { title: "End", field: "endDate", type: "time", filtering: false },
        { title: "Workout", field: "notes", filtering: false }
      ],
      data: workouts
    });
  }, [workouts, clients]);

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Workouts Management"
        className={classes.table}
        columns={state.columns}
        data={state.data}
        options={{ pageSize: 10, filtering: true, draggable: false }}
        onRowClick={(event, rowData) => {}}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                createWorkout(newData);
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                updateWorkout(newData);
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                deleteWorkout(oldData.id);
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
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
    </div>
  );
}
