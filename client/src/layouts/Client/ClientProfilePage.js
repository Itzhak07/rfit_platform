import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPageName } from "../../actions/pageActions";
import { useParams } from "react-router-dom";
import ClientWorkoutsTable from "../../components/Client/ClientWorkoutsTable";
import { Paper, makeStyles, Container } from "@material-ui/core";
import { ClientProfile } from "../../components/Client/ClientProfile";
import MenuButton from "../../components/Buttons/MenuButton";
import { ClientBreadCrumbs } from "./ClientBreadCrumbs";
import { NotFound } from "../NotFound/NotFound";
import ClientMessages from "../../components/Client/ClientMessages";
import { BigLogoSpinner } from "../Loader/Loaders";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexFlow: "column wrap"
  },
  profileSection: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start"
  },
  profilePaper: {
    width: "100%",
    padding: 10,
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
    height: 443,
    padding: 10,
    marginBottom: 20
  },
  item: { padding: "0 0 20px 0" }
}));

function ClientProfilePage({
  clients,
  workouts,
  emails,
  whatsapps,
  topClients,
  setPageName,
  loading
}) {
  const [state, setState] = useState({
    thisClient: null,
    thisWorkouts: null,
    thisEmails: null,
    thisWhatsapps: null
  });
  const { thisClient, thisWorkouts, thisEmails, thisWhatsapps } = state;
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    setPageName("Clients Manager");
  }, [setPageName]);

  useEffect(() => {
    if (clients !== null) {
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
          type: email.type,
          participants: email.participants.filter(client => {
            return client._id === id;
          })
        };

        if (clientEmail.participants.length > 0) {
          return clientEmail;
        }
      });

      const clientWhatsAppMessages = whatsapps.filter(msg => {
        let message = {
          subject: msg.subject,
          date: msg.date,
          message: msg.message,
          type: msg.type,
          participants: msg.participants.filter(client => {
            return client._id === id;
          })
        };
        if (message.participants.length > 0) {
          return message;
        }
      });

      setState({
        thisClient: thisClient[0],
        thisWorkouts: clientWorkouts,
        thisEmails: clientEmails,
        thisWhatsapps: clientWhatsAppMessages
      });
    }
  }, [clients, workouts, emails, whatsapps, id]);

  return (
    <div>
      {loading ? (
        <BigLogoSpinner />
      ) : !loading && thisClient ? (
        <div className={classes.root}>
          <ClientBreadCrumbs
            clientName={thisClient.firstName + " " + thisClient.lastName}
          />
          <Container maxWidth="xl" disableGutters>
            <div className={classes.profileSection}>
              <Paper className={classes.profilePaper} variant="outlined">
                {<ClientProfile client={thisClient} topClients={topClients} />}
              </Paper>
              <Paper className={classes.emailsPaper} variant="outlined">
                <ClientMessages
                  client={thisClient}
                  emails={thisEmails}
                  whatsapps={thisWhatsapps}
                />
              </Paper>
            </div>

            <Paper className={classes.workouts} variant="outlined">
              <ClientWorkoutsTable
                workouts={thisWorkouts}
                client={thisClient}
              />
            </Paper>
            <div>
              <MenuButton editClient sendEmail />
            </div>
          </Container>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

ClientProfilePage.propTypes = {
  clients: PropTypes.array,
  workouts: PropTypes.array,
  emails: PropTypes.array,
  whatsapps: PropTypes.array,
  topClients: PropTypes.array,
  setPageName: PropTypes.func,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients.clients,
  workouts: state.workouts.workouts,
  emails: state.messages.emails,
  whatsapps: state.messages.whatsapp,
  topClients: state.clients.topClients,
  loading: state.clients.loading
});

export default connect(mapStateToProps, { setPageName })(ClientProfilePage);
