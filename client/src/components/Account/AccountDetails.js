import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from "@material-ui/core";

import { updateUser } from "../../actions/authActions";
import { CircularLoader } from "../../layouts/Loader/Loaders";

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = ({ className, user, updateUser, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  }, [user]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    setDisable(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    updateUser(values);
    setDisable(true);
  };

  const accountDetailsContent =
    user !== null ? (
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="First name"
            margin="dense"
            name="firstName"
            onChange={handleChange}
            required
            value={values.firstName}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Last name"
            helperText="Please specify the last name"
            margin="dense"
            name="lastName"
            onChange={handleChange}
            required
            value={values.lastName}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            margin="dense"
            name="email"
            required
            value={values.email}
            variant="outlined"
            disabled
          />
        </Grid>
      </Grid>
    ) : (
      <CircularLoader />
    );

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate onSubmit={e => onSubmit(e)}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>{accountDetailsContent}</CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={disable}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  updateUser: PropTypes.func.isRequired
};

const mapStateToPros = state => ({
  user: state.auth.user
});

export default connect(mapStateToPros, { updateUser })(AccountDetails);
