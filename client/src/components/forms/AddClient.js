import React, { useState, lazy, Suspense } from "react";
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
  CircularProgress,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createClient } from "../../actions/clientActions";
import { PersonAdd as PersonAddIcon } from "@material-ui/icons";
import { Copyright } from "../Copyright/Copyright";
import { useEffect } from "react";

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
    width: "100%"
  }
}));

const AddClient = ({ createClient, alerts, closeModal, isNewClient }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: ""
  });

  useEffect(() => {
    if (isNewClient) {
      closeModal();
    }
  }, [isNewClient, closeModal]);

  const { firstName, lastName, email, phone, gender } = formData;

  const genderOptions = ["Male", "Female"];

  const classes = useStyles();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createClient(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon fontSize="large" color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Client
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            onChange={e => onChange(e)}
            value={firstName}
            className={classes.input}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id="lastName"
            autoComplete="lastName"
            onChange={e => onChange(e)}
            value={lastName}
            className={classes.input}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="text"
            id="email"
            autoComplete="email"
            onChange={e => onChange(e)}
            value={email}
            className={classes.input}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="text"
            id="phone"
            autoComplete="phone"
            onChange={e => onChange(e)}
            value={phone}
            className={classes.input}
          />
          <TextField
            id="gender"
            select
            label="Gender"
            value={gender}
            variant="outlined"
            name="gender"
            margin="normal"
            required
            className={classes.input}
            onChange={e => onChange(e)}
          >
            {genderOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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

AddClient.propTypes = {
  createClient: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  isNewClient: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts.alerts,
  isNewClient: state.clients.isNewClient
});

export default connect(mapStateToProps, { createClient })(AddClient);
