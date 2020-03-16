import React, { useState, lazy, Suspense } from "react";
import SimpleCard from "../../components/Cards/SimpleCard";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const TodaysWorkoutsModal = lazy(() =>
  import(
    /* webpackChunkName: "TodaysWorkoutsModal"*/ "../Modal/TodaysWorkoutsModal"
  )
);

const CardsHeader = ({
  workouts,
  clients,
  activeClients,
  loading,
  today,
  clientLoading
}) => {
  const [open, setOpen] = useState(false);
  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const styles = {
    cardsWrapper: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center",
      marginBottom: 50,
      boxShadow: "0px 0px 10px 9px rgb(255, 255, 255)",
      background: "#000000bf",
      height: "100%"
    }
  };

  return (
    <div style={styles.cardsWrapper}>
      <SimpleCard
        title="Total Workouts"
        count={!loading && workouts.length === 0 ? "0" : workouts.length}
        urlName="Workouts"
        url="dashboard/workouts"
      />
      <SimpleCard
        title="Clients"
        count={!clientLoading && clients.length === 0 ? "0" : clients.length}
        urlName="Clients"
        url="dashboard/clients"
      />
      <SimpleCard
        title="Active Clients"
        count={
          !clientLoading && activeClients.length === 0
            ? "0"
            : activeClients.length
        }
        urlName="Clients"
        url="dashboard/clients"
      />
      <SimpleCard
        title="Workouts Today"
        count={!loading && today.length === 0 ? "0" : today.length}
        btnName="More"
        openModal={modalOpen}
      />

      <Suspense fallback={<CircularProgress />}>
        <TodaysWorkoutsModal
          open={open}
          handleClose={modalClose}
          data={today}
          title="Today's Workouts"
        />
      </Suspense>
    </div>
  );
};

CardsHeader.propTypes = {
  workouts: PropTypes.array,
  today: PropTypes.array,
  clients: PropTypes.array,
  activeClients: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  workouts: state.workouts.workouts,
  today: state.workouts.today,
  clients: state.clients.clients,
  activeClients: state.clients.active,
  loading: state.workouts.loading,
  clientLoading: state.clients.loading
});

export default connect(mapStateToProps, {})(CardsHeader);
