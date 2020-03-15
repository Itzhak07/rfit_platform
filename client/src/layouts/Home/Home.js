import React, { useState, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SimpleCard from "../../components/Cards/SimpleCard";
import DaySchedule from "../../components/Schedule/DaySchedule";
import bgwhite from "../../assets/images/bgwhite.png";
import { CircularProgress, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  CalendarToday as CalendarTodayIcon,
  AccountBox as AccountBoxIcon
} from "@material-ui/icons";
import MenuButton from "../../components/Buttons/MenuButton";
import { CardsHeader } from "./CardsHeader";

const TodaysWorkoutsModal = lazy(() =>
  import(
    /* webpackChunkName: "TodaysWorkoutsModal"*/ "../Modal/TodaysWorkoutsModal"
  )
);

function Home({
  workouts,
  clients,
  activeClients,
  loading,
  today,
  clientLoading
}) {
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
      background: `url(${bgwhite})`,
      padding: 10
    },
    cardsWrapper: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-evenly",
      marginBottom: 50,
      boxShadow: "0px 0px 10px 9px rgb(255, 255, 255)",
      background: "#000000bf",
      height: "100%"
    },
    schedule: {
      margin: "auto"
    },
    linkBtn: {
      margin: "0 5px"
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
            clients == null || (!clientLoading && clients.length === 0)
              ? "0"
              : clients.length
          }
          urlName="Clients"
          url="dashboard/clients"
        />
        <SimpleCard
          title="Active Clients"
          count={
            clients == null || (!clientLoading && activeClients.length === 0)
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
      </div>

      {/* <CardsHeader /> */}

      <div style={styles.schedule}>
        <Link style={styles.linkBtn} to="./dashboard/schedule">
          <Button variant="outlined" startIcon={<CalendarTodayIcon />}>
            Full Scheduele
          </Button>
        </Link>
        <Link style={styles.linkBtn} to="./dashboard/account">
          <Button variant="outlined" startIcon={<AccountBoxIcon />}>
            Account
          </Button>
        </Link>
        <DaySchedule />
      </div>
      <MenuButton/>

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
  activeClients: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  workouts: state.workouts.workouts,
  today: state.workouts.today,
  clients: state.clients.clients,
  activeClients: state.clients.active,
  loading: state.workouts.loading,
  clientLoading: state.clients.loading
});

export default connect(mapStateToProps, {})(Home);
