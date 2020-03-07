import React, { useState, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SimpleCard from "../components/SimpleCard";
import { fetchWorkouts } from "../actions/workoutActions";
import { fetchClients } from "../actions/clientActions";
import DaySchedule from "../components/DaySchedule";
import bgwhite from "../assets/images/bgwhite.png";
import { CircularProgress } from "@material-ui/core";

const TodaysWorkoutsModal = lazy(() =>
  import("../layouts/TodaysWorkoutsModal")
);

function Home({ workouts, clients, activeClients, loading, today }) {
  const [open, setOpen] = useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const styles = {
    root: {
      display: "flex",
      flexFlow: "row-reverse wrap",
      justifyContent: "space-evenly",
      background: `url(${bgwhite})`
    },
    cardsWrapper: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-evenly",
      marginBottom: 50,
      boxShadow: "0px 0px 10px 9px rgb(255, 255, 255)",
      background: "#000000bf",
      height: "100%",
      // borderRadius: 30
    },
    schedule: {
      margin: "auto"
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.cardsWrapper}>
        <SimpleCard
          title="Total Workouts"
          count={!loading && workouts.length === 0 ? "0" : workouts.length}
          urlName="Workouts"
          url="dashboard/workouts"
        />
        <SimpleCard
          title="Clients"
          count={
            clients == null || (!loading && clients.length === 0)
              ? "0"
              : clients.length
          }
          urlName="Clients"
          url="dashboard/clients"
        />
        <SimpleCard
          title="Active Clients"
          count={
            !loading && activeClients.length === 0 ? "0" : activeClients.length
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
      </div>
      <div style={styles.schedule}>
        <DaySchedule workouts={today} loading={loading} />
      </div>

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
}

Home.propTypes = {
  workouts: PropTypes.array.isRequired,
  today: PropTypes.array.isRequired,
  clients: PropTypes.array,
  activeClients: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  workouts: state.workouts.workouts,
  today: state.workouts.today,
  clients: state.clients.clients,
  activeClients: state.clients.active,
  loading: state.workouts.loading
});

export default connect(mapStateToProps, { fetchWorkouts, fetchClients })(Home);
