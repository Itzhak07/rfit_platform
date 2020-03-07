import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

const AccountDetails = lazy(() => import("../components/AccountDetails"));
const AccountProfile = lazy(() => import("../components/AccountProfile"));

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    maxWidth: 700,
    height: "100%",
    margin: "auto"
  }
}));

function Account({ user }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Suspense fallback={<CircularProgress />}>
        <AccountProfile />
        <AccountDetails />
      </Suspense>
    </div>
  );
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToPros = state => ({
  user: state.auth.user
});

export default connect(mapStateToPros)(Account);
