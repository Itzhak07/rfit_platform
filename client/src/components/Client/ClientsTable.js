import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "moment-timezone";
import MaterialTable from "material-table";
import { Paper, CircularProgress } from "@material-ui/core";
const ErrorAlert = lazy(() =>
  import(/* webpackChunkName: "ErrorAlert"*/ "../Alerts/ErrorAlert")
);

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  }
});

export default function ClientsTable({
  clients,
  createClient,
  updateClient,
  alerts
}) {
  const [state, setState] = useState({
    columns: [],
    data: []
  });

  const classes = useStyles();

  useEffect(() => {
    setState({
      columns: [
        {
          title: "First Name",
          field: "firstName",
          render: rowData => (
            <Link to={"/dashboard/clients/" + rowData._id}>
              {rowData.firstName}
            </Link>
          ),
          cellStyle: {
            fontWeight: 600,
            color: "#039be5",
            transform: " scale(1.2)"
          }
        },
        {
          title: "Last Name",
          field: "lastName"
        },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
        {
          title: "Gender",
          field: "gender",
          lookup: { Male: "Male", Female: "Female" }
        },
        {
          title: "Status",
          field: "status",
          editable: "onUpdate",
          initialEditValue: 1,
          lookup: { 1: "Active", 2: "Not-Active" }
        }
      ],
      data: clients
    });
  }, [clients]);

  return (
    <Paper variant="outlined">
      <div className={classes.root}>
        <MaterialTable
          title="Clients Management"
          columns={state.columns}
          data={state.data}
          onRowClick={(event, rowData) => {}}
          options={{ pageSize: 10, filtering: true, draggable: false }}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  createClient(newData);
                  resolve();
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  updateClient(newData);
                  resolve();
                  if (oldData) {
                    setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
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
    </Paper>
  );
}
