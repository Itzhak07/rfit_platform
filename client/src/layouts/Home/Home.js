import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPageName } from "../../actions/pageActions";
import DaySchedule from "../../components/Schedule/DaySchedule";
import bgwhite from "../../assets/images/bgwhite.png";
import MenuButton from "../../components/Buttons/MenuButton";
import CardsHeader from "./CardsHeader";
import TopClients from "../../components/Client/TopClients";
import FastLinks from "./FastLinks";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "row-reverse wrap",
    justifyContent: "space-evenly",
    background: `url(${bgwhite})`
  },
  leftSection: {
    display: "flex"
  },
  rightSection: {
    marginBottom: 20,
    transition: "all 0.3s ease",
    [theme.breakpoints.only("lg")]: {
      maxWidth: 650,
      transition: "all 0.3s ease"
    }
  },
  rightBottom: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around"
  }
}));

const Home = ({ setPageName }) => {
  const classes = useStyles();
  useEffect(() => {
    setPageName("Dashboard");
  }, [setPageName]);

  return (
    <div className={classes.root}>
      <div className={classes.rightSection}>
        <CardsHeader />
        <div className={classes.rightBottom}>
          <FastLinks />
          <TopClients />
        </div>
      </div>

      <div className={classes.leftSection}>
        <DaySchedule />
      </div>
      <MenuButton />
    </div>
  );
};

Home.propTypes = {
  setPageName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  setPageName
})(Home);
