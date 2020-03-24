import React, { useState } from "react";
import { makeStyles, Fade } from "@material-ui/core";
import { FeatureCard } from "../components/FeatureCard";
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
    padding: "50px 0 50px"
  },
  container: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginTop: 20,
    transition: "all 0.3s ease",
    height: 590,
    [theme.breakpoints.down("md")]: {
      transition: "all 0.3s ease",
      flexFlow: "column wrap",
      height: 700
    },
    [theme.breakpoints.down("sm")]: {
      height: 650
    },
    [theme.breakpoints.down("xs")]: {
      height: 500,
      justifyContent: "unset"
    }
  },
  imgContainer: {
    transition: "all 0.3s ease",
    width: 900,
    [theme.breakpoints.down(1600)]: {
      width: 800,
      transition: "all 0.3s ease",
      margin: "0 auto"
    },
    [theme.breakpoints.down(1500)]: {
      width: 581,
      height: 400,
      transition: "all 0.3s ease",
      margin: "0 auto"
    },
    [theme.breakpoints.down("sm")]: {
      width: 500,
      transition: "all 0.3s ease",
      margin: "0 auto"
    },
    [theme.breakpoints.down("xs")]: {
      width: 400,
      height: 260,
      transition: "all 0.3s ease",
      margin: "0 auto"
    }
  },
  img: {
    width: "100%",
    margin: "0 auto"
  },
  column: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row"
    }
  },
  headers: {
    padding: 10,
    height: 140,
    [theme.breakpoints.down("sm")]: {
      height: 200
    },
    [theme.breakpoints.down("xs")]: {
      height: 225
    }
  },
  title: {
    fontSize: 48,
    [theme.breakpoints.down("sm")]: {
      fontSize: 40
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 36
    }
  },
  seconadryTitle: {
    fontSize: 30,
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: 26
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 22
    }
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
    title: "Explore Our Features",
    secondaryTitle: "The RFit Platform is here for your need"
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
      <div className={classes.headers}>
        <Typography
          className={classes.title}
          variant="h2"
          marked="center"
          align="center"
          component="h2"
        >
          {title}
        </Typography>

        <Typography
          className={classes.seconadryTitle}
          variant="h5"
          align="center"
          component="h5"
        >
          {secondaryTitle}
        </Typography>
      </div>

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
            text="Fits Any Device"
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

        <div className={classes.imgContainer} key={featureList[index]}>
          <Fade in timeout={{ enter: 1000, exit: 5000 }}>
            <img
              src={featureList[index]}
              className={classes.img}
              alt={featureList[index]}
            />
          </Fade>
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
