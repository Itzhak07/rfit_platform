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
  thisMonthWorkouts,
  clients,
  activeClients,
  loading,
  todayWorkouts,
  clientLoading,
  thisWeekWorkouts
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
      marginBottom: 20,
      boxShadow: "0px 0px 10px 9px rgb(255, 255, 255)",
      backgroundImage:
        " radial-gradient(circle, #666666, #4c4c4c, #343434, #1d1d1d, #000000)",
      borderRadius: 4
    }
  };

  return (
    <div style={styles.cardsWrapper}>
      <SimpleCard
        title="Appointments This Week"
        count={
          (!loading && thisWeekWorkouts.length === 0) ||
          thisWeekWorkouts == null
            ? "0"
            : thisWeekWorkouts.length
        }
        url="dashboard/schedule"
      />
      <SimpleCard
        title="Clients"
        count={
          (!clientLoading && clients.length === 0) || clients == null
            ? "0"
            : clients.length
        }
        url="dashboard/clients"
      />
      <SimpleCard
        title="Active Clients"
        count={
          (!clientLoading && activeClients.length === 0) ||
          activeClients == null
            ? "0"
            : activeClients.length
        }
        url="dashboard/clients"
      />
      <SimpleCard
        title="Appointments For Today"
        count={
          (!loading && todayWorkouts.length === 0) || todayWorkouts == null
            ? "0"
            : todayWorkouts.length
        }
        btnName="More"
        openModal={modalOpen}
      />

      <Suspense fallback={<CircularProgress />}>
        <TodaysWorkoutsModal
          open={open}
          handleClose={modalClose}
          data={todayWorkouts}
          url="dashboard/"
          title="Today's Appointments"
        />
      </Suspense>
    </div>
  );
};

CardsHeader.propTypes = {
  workouts: PropTypes.array,
  todayWorkouts: PropTypes.array,
  clients: PropTypes.array,
  activeClients: PropTypes.array,
  loading: PropTypes.bool,
  thisMonthWorkouts: PropTypes.array,
  thisWeekWorkouts: PropTypes.array
};

const mapStateToProps = state => ({
  workouts: state.workouts.workouts,
  todayWorkouts: state.workouts.today,
  thisWeekWorkouts: state.workouts.thisWeek,
  thisMonthWorkouts: state.workouts.thisMonth,
  clients: state.clients.clients,
  activeClients: state.clients.active,
  loading: state.workouts.loading,
  clientLoading: state.clients.loading
});

export default connect(mapStateToProps, {})(CardsHeader);
