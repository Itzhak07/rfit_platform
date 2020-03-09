import React, { useState, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../actions/authActions";
import { Redirect } from "react-router-dom";

const ErrorAlert = lazy(() => import("../Alerts/ErrorAlert"));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">RFit Platform</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    borderRadius: "30px"
  }
}));

const Login = ({ login, alerts, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const classes = useStyles();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="./dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email-login"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => onChange(e)}
            value={email}
            className={classes.input}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password-login"
            autoComplete="current-password"
            onChange={e => onChange(e)}
            value={password}
            className={classes.input}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alerts.alerts
});

export default connect(mapStateToProps, { login })(Login);
