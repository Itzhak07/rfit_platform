import React from "react";
import DaySchedule from "../../components/Schedule/DaySchedule";
import bgwhite from "../../assets/images/bgwhite.png";
import MenuButton from "../../components/Buttons/MenuButton";
import CardsHeader from "./CardsHeader";
import TopClients from "../../components/Client/TopClients";
import { FastLinks } from "./FastLinks";

const Home = () => {
  const styles = {
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
      marginBottom: 20
    },
    rightBottom: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-around"
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.rightSection}>
        <CardsHeader />
        <div style={styles.rightBottom}>
          <FastLinks />
          <TopClients />
        </div>
      </div>

      <div style={styles.leftSection}>
        <DaySchedule />
      </div>
      <MenuButton />
    </div>
  );
};

export default Home;
