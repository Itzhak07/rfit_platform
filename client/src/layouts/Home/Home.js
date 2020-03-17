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
      background: `url(${bgwhite})`,
      padding: 10
    },
    leftSection: {
      display: "flex"
    },
    rightSection: {
      marginBottom: 20
    }
  };

  return (
    <div style={styles.root}>
      <FastLinks />
      <div style={styles.rightSection}>
        <CardsHeader />

        <TopClients />
      </div>

      <div style={styles.leftSection}>
        <DaySchedule />
      </div>
      <MenuButton />
    </div>
  );
};

export default Home;
