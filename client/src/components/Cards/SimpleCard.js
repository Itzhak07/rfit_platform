import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider
} from "@material-ui/core";
import { CircularLoader } from "../../layouts/Loader/Loaders";

const useStyles = makeStyles({
  root: {
    width: 270,
    height: 130,
    textAlign: "center",
    margin: 10,
    paddingTop: 5,
    transition: "all 0.3s ease",
    background: "linear-gradient(200deg,#ffffff,#a9a9a9)",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all 0.3s ease"
    }
  },

  title: {
    color: "black",
    fontSize: 16,
    fontWeight: 500
  },
  countNum: {
    // marginTop: 5,
    fontSize: 35
  },
  content: {
    padding: "5px 0"
  },
  actions: {
    padding: "0 0 0 8px"
  }
});

export default function SimpleCard({ title, count, url, btnName, openModal }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <Link to={url}>
          <CardContent className={classes.content}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Divider light />
            {count ? (
              <Typography className={classes.countNum}>{count}</Typography>
            ) : (
              <CircularLoader />
            )}
          </CardContent>
          {openModal ? (
            <CardActions className={classes.actions}>
              <Button size="small" color="primary" onClick={() => openModal()}>
                {btnName}
              </Button>
            </CardActions>
          ) : (
            ""
          )}
        </Link>
      </Card>
    </div>
  );
}
