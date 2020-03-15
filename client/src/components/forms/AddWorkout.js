import React, { useState, lazy, Suspense, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FitnessCenter as FitnessCenterIcon } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {
  DateTimePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Copyright } from "../Copyright/Copyright";
import { createWorkout } from "../../actions/workoutActions";

const ErrorAlert = lazy(() =>
  import(/* webpackChunkName: "ErrorAlert"*/ "../Alerts/ErrorAlert")
);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    borderRadius: "30px",
    width: "100%",
    margin: "16px 0 8px 0"
  }
}));

const AddWorkout = ({ createWorkout, activeClients, alerts, closeModal, isNewWorkout }) => {
  const [formData, setFormData] = useState({
    client: "",
    startDate: new Date(),
    endDate: new Date(),
    notes: ""
  });

  useEffect(() => {
    if (isNewWorkout) {
      closeModal();
    }
  }, [isNewWorkout]);

  const { endDate, startDate, notes } = formData;

  const clientsOptions = activeClients.map(client => {
    return {
      id: client._id,
      text: client.firstName + " " + client.lastName
    };
  });

  const classes = useStyles();

  const onWorkoutChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClientChange = id => {
    setFormData({ ...formData, client: id });
  };

  const onStartChange = e => {
    setFormData({ ...formData, startDate: e });
  };

  const onEndChange = e => {
    setFormData({ ...formData, endDate: e });
  };

  const onSubmit = e => {
    e.preventDefault();
    createWorkout(formData);
    setFormData({
      client: "",
      startDate: new Date(),
      endDate: new Date(),
      notes: ""
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FitnessCenterIcon fontSize="large" color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Workout
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <Autocomplete
            id="combo-box-demo"
            options={clientsOptions}
            getOptionLabel={option => option.text}
            className={classes.input}
            onChange={(event, value) => {
              onClientChange(value.id);
            }}
            renderInput={params => (
              <TextField
                {...params}
                className={classes.input}
                // margin="normal"
                label="Client"
                variant="outlined"
                type="search"
              />
            )}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              clearable
              ampm={false}
              label="From"
              name="startDate"
              className={classes.input}
              inputVariant="outlined"
              value={startDate}
              disablePast
              onChange={e => onStartChange(e)}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              clearable
              ampm={false}
              label="Until"
              name="endDate"
              className={classes.input}
              inputVariant="outlined"
              value={endDate}
              onChange={e => onEndChange(e)}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="outlined-multiline-static"
            name="notes"
            label="Workout"
            onChange={e => onWorkoutChange(e)}
            className={classes.input}
            multiline
            rows="5"
            variant="outlined"
            value={notes}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
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
      <Box>
        <Copyright />
      </Box>
    </Container>
  );
};

AddWorkout.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  activeClients: PropTypes.array.isRequired,
  alerts: PropTypes.array.isRequired,
  isNewWorkout: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts.alerts,
  activeClients: state.clients.active,
  isNewWorkout: state.workouts.isNewWorkout
});

export default connect(mapStateToProps, { createWorkout })(AddWorkout);
