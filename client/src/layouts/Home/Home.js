import React from "react";
import DaySchedule from "../../components/Schedule/DaySchedule";
import bgwhite from "../../assets/images/bgwhite.png";
import MenuButton from "../../components/Buttons/MenuButton";
import CardsHeader from "./CardsHeader";
import { FastLinks } from "./FastLinks";

const Home = () => {
  const styles = {
    root: {
      display: "flex",
      flexFlow: "row-reverse wrap",
      justifyContent: "space-evenly",
      background: `url(${bgwhite})`,
      padding: 10
    }
  };

  return (
    <div style={styles.root}>
      <FastLinks />
      <CardsHeader />
      <DaySchedule />
      <MenuButton />
    </div>
  );
};

export default Home;
