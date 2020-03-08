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
    flexFlow: "row wrap"
  },
  info: {
    padding: 20,
    width: 430
  },
  workouts: {
    padding: 20,
    width: "100%",
    margin: "20px auto"
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
  }, [clients, workouts, id]);

  return (
    <div className={classes.root}>
      <Paper className={classes.info} variant="outlined">
        {<ClientProfile client={thisClient} />}
      </Paper>
      <Paper className={classes.workouts} variant="outlined">
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
