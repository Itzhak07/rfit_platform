import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  details: {
    // margin: "auto",
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

  return (
    <Card className={classes.root}>
      <CardContent className={classes.details}>
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
          <Avatar className={classes.avatar} src={user.avatar} />
        </div>
      </CardContent>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

const mapStateToPros = state => ({
  user: state.auth.user
});

export default connect(mapStateToPros)(AccountProfile);
