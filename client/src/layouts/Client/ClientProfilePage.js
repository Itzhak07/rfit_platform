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
import ClientMessages from "../../components/Client/ClientMessages";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexFlow: "column wrap"
  },
  infoSection: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start"
  },
  paper: {
    width: "100%",
    padding: 20,
    maxWidth: 500,
    margin: "0 20px 20px 0",
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 20px 0"
    }
  },
  tablePaper: {
    padding: 20,
    marginTop: 20
  },
  emailsPaper: {
    width: "100%",
    maxWidth: 500,
    height: 412,
    padding: 10,
    marginBottom: 20
  },
  item: { padding: "0 0 20px 0" }
}));

function ClientProfilePage({ clients, workouts, emails }) {
  const [state, setState] = useState({
    thisClient: "",
    thisWorkouts: "",
    thisEmails: ""
  });
  const { thisClient, thisWorkouts, thisEmails } = state;
  const { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    const thisClient = clients.filter(client => {
      return client._id === id;
    });

    const clientWorkouts = workouts.filter(workouts => {
      return workouts.client === id;
    });

    const clientEmails = emails.filter(email => {
      let clientEmail = {
        subject: email.subject,
        date: email.date,
        message: email.message,
        participants: email.participants.filter(client => {
          return client._id === id;
        })
      };

      if (clientEmail.participants.length > 0) {
        return clientEmail;
      }
    });

    setState({
      thisClient: thisClient[0],
      thisWorkouts: clientWorkouts,
      thisEmails: clientEmails
    });
  }, [clients, workouts, emails, id]);

  return (
    <div>
      {!thisClient ? (
        <NotFound />
      ) : (
        <div className={classes.root}>
          <ClientBreadCrumbs
            clientName={thisClient.firstName + " " + thisClient.lastName}
          />
          <Container maxWidth="xl" disableGutters>
            <div className={classes.infoSection}>
              <Paper className={classes.paper} variant="outlined">
                {<ClientProfile client={thisClient} />}
              </Paper>
              <Paper className={classes.emailsPaper} variant="outlined">
                <ClientMessages client={thisClient} emails={thisEmails} />
              </Paper>
            </div>

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
  workouts: PropTypes.array,
  emails: PropTypes.array
};

const mapStateToProps = state => ({
  clients: state.clients.clients,
  workouts: state.workouts.workouts,
  emails: state.messages.emails
});

export default connect(mapStateToProps)(ClientProfilePage);
