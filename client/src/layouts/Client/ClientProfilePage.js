import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ClientWorkoutsTable from "../../components/Client/ClientWorkoutsTable";
import { Paper, makeStyles, Container } from "@material-ui/core";
import { ClientProfile } from "../../components/Client/ClientProfile";
import MenuButton from "../../components/Buttons/MenuButton";
import { ClientBreadCrumbs } from "./ClientBreadCrumbs";
import { NotFound } from "../NotFound/NotFound";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexFlow: "column wrap"
  },
  info: {
    padding: 20,
    maxWidth: 500
  },
  workouts: {
    padding: 20,
    marginTop: 20
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
    <div>
      {!thisClient ? (
        <NotFound />
      ) : (
        <div className={classes.root}>
          {" "}
          <ClientBreadCrumbs
            clientName={thisClient.firstName + " " + thisClient.lastName}
          />
          <Container maxWidth="xl" disableGutters>
            <Paper className={classes.info} variant="outlined">
              {<ClientProfile client={thisClient} />}
            </Paper>
            <Paper className={classes.workouts} variant="outlined">
              <ClientWorkoutsTable
                workouts={thisWorkouts}
                client={thisClient}
              />
            </Paper>
            <div>
              <MenuButton editClient />
            </div>
          </Container>{" "}
        </div>
      )}
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
