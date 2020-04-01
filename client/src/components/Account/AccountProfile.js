import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";
import { CircularLoader } from "../../layouts/Loader/Loaders";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  details: {
    display: "flex",
    flexFlow: "row-reverse wrap",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  avatarWrapper: {
    flexGrow: 0.2
  },
  avatar: {
    height: 90,
    width: 90
  }
}));

const AccountProfile = ({ user }) => {
  const classes = useStyles();

  const userProfile =
    user !== null ? (
      <Fragment>
        <div>
          <Typography gutterBottom variant="h4">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography
            className={classes.locationText}
            color="textSecondary"
            variant="body1"
          >
            {user.email}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            Date Joined: {moment(user.date).format("L")}
          </Typography>
        </div>
        <div className={classes.avatarWrapper}>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
            alt="User's Avatar"
          />
        </div>
      </Fragment>
    ) : (
      <CircularLoader />
    );

  return (
    <Card className={classes.root}>
      <CardContent className={classes.details}>{userProfile}</CardContent>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
};

const mapStateToPros = state => ({
  user: state.auth.user
});

export default connect(mapStateToPros)(AccountProfile);
