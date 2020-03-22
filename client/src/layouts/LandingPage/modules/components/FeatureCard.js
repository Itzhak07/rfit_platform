import React from "react";
import { Card, makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    height: 100,
    borderRadius: 5,
    transition: "all 0.3s ease",
    margin: 20,
    cursor: "pointer",
    display: "flex",
    "&:hover": {
      transform: "scale(1.2)",
      transition: "all 0.3s ease"
    },
    [theme.breakpoints.down("sm")]: {
      width: 150,
      margin: 10
    },
    [theme.breakpoints.down("xs")]: {
      width: 100,
      height: 80,
      margin: 10
    }
  },
  content: {
    color: "white",
    alignSelf: "center",
    width: "100%"
  },
  text: {
    fontSize: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 16
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 11
    }
  }
}));
export const FeatureCard = ({
  text,
  color,
  handleClick,
  index,
  secondaryTitle
}) => {
  const classes = useStyles(color);
  return (
    <Card
      raised
      style={{ background: `linear-gradient(${color})` }}
      className={classes.root}
      onClick={() => handleClick(index, text, secondaryTitle)}
    >
      <Button fullWidth>
        <div className={classes.content}>
          <Typography color="inherit" align="center" className={classes.text}>
            {text}
          </Typography>
        </div>
      </Button>
    </Card>
  );
};
