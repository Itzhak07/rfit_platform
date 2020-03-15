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
  CircularProgress,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateClient } from "../../actions/clientActions";
import { Edit as EditIcon } from "@material-ui/icons";
import { Copyright } from "../Copyright/Copyright";
import { useParams } from "react-router-dom";
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

const EditClient = ({
  updateClient,
  alerts,
  closeModal,
  closeMenu,
  clients
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: ""
  });

  const { firstName, lastName, email, phone, gender } = formData;

  const genderOptions = ["Male", "Female"];

  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    const thisClient = clients.filter(client => {
      return client._id === id;
    });
    setFormData(thisClient[0]);
  }, [clients, id]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateClient(formData);
    closeModal();
    closeMenu();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon fontSize="large" color="primary" />
        </Avatar>
        <Typography componen t="h1" variant="h5">
          Edit Client
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

EditClient.propTypes = {
  updateClient: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients.clients,
  alerts: state.alerts.alerts
});

export default connect(mapStateToProps, { updateClient })(EditClient);
