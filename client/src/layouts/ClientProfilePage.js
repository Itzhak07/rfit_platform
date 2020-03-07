import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ClientWorkoutsTable from "../components/ClientWorkoutsTable";
import { Paper, makeStyles } from "@material-ui/core";
import { ClientProfile } from "../components/ClientProfile";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly"
  },
  paper: {
    padding: 20,
    width: 800
  },
  item: { padding: "0 0 20px 0" }
});

function ClientProfilePage({ clients, workouts }) {
  const [state, setState] = useState({
    thisClient: "",
    thisWorkouts: ""
  });
  const { thisClient, thisWorkouts } = state;
  const { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    const thisClient = clients.filter(client => {
      return client._id === id;
    });
    const clientWorkouts = workouts.filter(workouts => {
      return workouts.client === id;
    });
    setState({ thisClient: thisClient[0], thisWorkouts: clientWorkouts });
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant="outlined">
        {<ClientProfile client={thisClient} />}
      </Paper>
      <Paper className={classes.paper} variant="outlined">
        <h2> {thisClient.firstName}'s Workouts History:</h2>
        <ClientWorkoutsTable workouts={thisWorkouts} />
      </Paper>
    </div>
  );
}

ClientProfilePage.propTypes = {
  clients: PropTypes.array,
  workouts: PropTypes.array
};

const mapStateToProps = state => ({
  clients: state.clients.clients,
  workouts: state.workouts.workouts
});

export default connect(mapStateToProps)(ClientProfilePage);
