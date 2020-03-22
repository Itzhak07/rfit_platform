import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { FeatureCard } from "../components/FeatureCard";
import { Spring } from "react-spring/renderprops";
import DashboardMockUp from "../../../../assets/images/mockups/dashboard.png";
import ScheduleMockUp from "../../../../assets/images/mockups/schedule.png";
import ClientsMockUp from "../../../../assets/images/mockups/clients.png";
import AppointmentsMockUp from "../../../../assets/images/mockups/appointments.png";
import MobileMockUp from "../../../../assets/images/mockups/mobile.png";
import ClientProfile from "../../../../assets/images/mockups/clientProfile.png";
import Typography from "../components/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f6f6f6",
    padding: "100px 0"
  },
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginTop: 20,
    transition: "all 0.3s ease",
    [theme.breakpoints.down("md")]: {
      transition: "all 0.3s ease",
      flexFlow: "column wrap"
    }
  },
  img: {
    transition: "all 0.3s ease",
    [theme.breakpoints.down("lg")]: {
      maxWidth: 650,
      transition: "all 0.3s ease"
    }
  },
  column: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto"
  }
}));

export const ProductFeatures = () => {
  const [state, setState] = useState({
    index: 0,
    featureList: [
      DashboardMockUp,
      MobileMockUp,
      ScheduleMockUp,
      AppointmentsMockUp,
      ClientsMockUp,
      ClientProfile
    ],
    title: "Everything you need in one place",
    secondaryTitle: "Explore Our Features"
  });

  const classes = useStyles();

  const { featureList, index, title, secondaryTitle } = state;

  const handleClick = (index, title, secondaryTitle) => {
    setState({
      ...state,
      index: index,
      title: title,
      secondaryTitle: secondaryTitle
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" marked="center" align="center" component="h2">
        {title}
      </Typography>

      <Typography
        style={{ marginTop: 10, fontSize: 30 }}
        variant="h5"
        align="center"
        component="h5"
      >
        {secondaryTitle}
      </Typography>

      <div className={classes.container}>
        <div className={classes.column}>
          <FeatureCard
            handleClick={handleClick}
            index={0}
            text="Reactive Dashboard"
            secondaryTitle="Monitor your daily appointments with fast access controls to any action"
            color="135deg,#f6d365,#fda085"
          />
          <FeatureCard
            handleClick={handleClick}
            index={1}
            text="Fits To Any Device"
            secondaryTitle="Full compatibility with any device! carry our platform anywhere you go!"
            color="135deg,#f093fb,#f5576c"
          />
          <FeatureCard
            handleClick={handleClick}
            index={2}
            text="Schedule"
            secondaryTitle="Monitor your schedule, add, edit or remove appoitments with just 2 clicks!"
            color="135deg,#5ee7df,#b490ca"
          />
        </div>

        <div
          style={{ minWidth: 400 }}
          className={classes.img}
          key={featureList[index]}
        >
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ tension: 120, friction: 60, delay: 200 }}
          >
            {props => (
              <img
                style={props}
                src={featureList[index]}
                width="100%"
                alt={featureList[index]}
              />
            )}
          </Spring>
        </div>

        <div className={classes.column}>
          <FeatureCard
            handleClick={handleClick}
            index={3}
            text="Appointments Management Tools"
            secondaryTitle="A list view of your appointments with filtering options and actions"
            color="135deg,#f6d365,#fda085"
          />
          <FeatureCard
            handleClick={handleClick}
            index={4}
            text="Clients Management Tools"
            secondaryTitle="Manage your clients information in one place"
            color="135deg,#f093fb,#f5576c"
          />
          <FeatureCard
            handleClick={handleClick}
            index={5}
            text="Client Appointments Tracking"
            secondaryTitle="Track your client appointments history"
            color="135deg,#5ee7df,#b490ca"
          />
        </div>
      </div>
    </div>
  );
};
