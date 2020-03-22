import React from "react";
import { Card, makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(({ color }) => ({
  root: {
    width: 300,
    height: 100,
    borderRadius: 5,
    transition: "all 0.3s ease",
    marginBottom: 20,
    cursor: "pointer",
    display: "flex",
    "&:hover": {
      transform: "scale(1.2)",
      transition: "all 0.3s ease"
    }
  },
  content: {
    color: "white",
    alignSelf: "center",
    width: "100%"
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
          <Typography color="inherit" variant="h5" align="center">
            {text}
          </Typography>
        </div>
      </Button>
    </Card>
  );
};
