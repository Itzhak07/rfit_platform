import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  CircularProgress,
  Fade
} from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";

const TopClients = ({ topClients, loading }) => {
  console.log(topClients);

  const styles = {
    root: {
      maxWidth: 500,
      marginLeft: "auto",
      flexGrow: 1
    },
    paper: {
      padding: "0 16px",
      background: "#3f51b5",
      color: "white",
      width: "100%"
    },
    title: {
      paddingTop: 10,
      fontSize: 20
    },
    icon: {
      color: "#ffb100"
    },
    divider: {
      background: "#ffffff7a"
    },
    loader: {
      color: "white",
      margin: 20
    },
    message: {
      color: "white"
    }
  };

  return (
    <div style={styles.root}>
      <Paper style={styles.paper} elevation={3}>
        <Typography style={styles.title}>Top Clients:</Typography>
        {loading ? <CircularProgress style={styles.loader} /> : ""}

        {!loading && topClients !== null ? (
          <List>
            {topClients.map(client => {
              return (
                <div key={client}>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <StarRateIcon style={styles.icon} fontSize="large" />
                    </ListItemIcon>
                    <Fade in timeout={1000}>
                      <ListItemText primary={client} />
                    </Fade>
                  </ListItem>
                  <Divider style={styles.divider} variant="middle" />
                </div>
              );
            })}
          </List>
        ) : !loading && topClients == null ? (
          <Typography style={styles.message}>
            Clients with minimum of 3 appointments will be shown here
          </Typography>
        ) : (
          ""
        )}
      </Paper>
    </div>
  );
};

TopClients.propTypes = {
  topClients: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  topClients: state.clients.topClients,
  loading: state.clients.loading
});

export default connect(mapStateToProps, {})(TopClients);
