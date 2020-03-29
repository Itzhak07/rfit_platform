import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setPageName } from "../../actions/pageActions";
import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

const AccountDetails = lazy(() =>
  import(
    /* webpackChunkName: "AccountDetails"*/ "../../components/Account/AccountDetails"
  )
);
const AccountProfile = lazy(() =>
  import(
    /* webpackChunkName: "AccountProfile"*/ "../../components/Account/AccountProfile"
  )
);

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

function Account({ user, setPageName }) {
  const classes = useStyles();
  useEffect(() => {
    setPageName("Account");
  }, [setPageName]);

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
  setPageName: PropTypes.func.isRequired
};

const mapStateToPros = state => ({
  user: state.auth.user
});

export default connect(mapStateToPros, { setPageName })(Account);
