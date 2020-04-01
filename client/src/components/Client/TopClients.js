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
  Fade
} from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { CircularLoader } from "../../layouts/Loader/Loaders";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    flexGrow: 1,
    marginBottom: 10,
    color: "white"
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
  },
  itemtext: {
    color: "white",
    "&:hover": {
      color: "#dcdcdc"
    }
  }
}));

const TopClients = ({ topClients, loading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography className={classes.title}>Top Clients:</Typography>
        {loading ? (
          <div className={classes.loader}>
            <CircularLoader color="inherit" />
          </div>
        ) : !loading && topClients !== null ? (
          <List>
            {topClients.map(client => {
              return (
                <div key={client.name}>
                  <Link to={"./dashboard/clients/" + client.id}>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <StarRateIcon
                          className={classes.icon}
                          fontSize="large"
                        />
                      </ListItemIcon>
                      <Fade in timeout={1000}>
                        <ListItemText
                          className={classes.itemtext}
                          primary={client.name}
                        />
                      </Fade>
                    </ListItem>
                  </Link>
                  <Divider className={classes.divider} variant="middle" />
                </div>
              );
            })}
          </List>
        ) : !loading && topClients == null ? (
          <Typography className={classes.message}>
            Clients with minimum of 4 appointments will be shown here
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
