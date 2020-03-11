import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 250,
    textAlign: "center",
    margin: 20,
    paddinTop: 5
    // boxShadow: "0px 0px 28px -9px rgb(100, 181, 246)"
  },

  title: {
    color: "black",
    fontSize: 20
  },
  countNum: {
    marginTop: 5,
    fontSize: 26
  },
  content: {
    padding: "5px 0"
  }
});

export default function SimpleCard({
  title,
  count,
  urlName,
  url,
  btnName,
  openModal
}) {
  const classes = useStyles();
  return (
    <div>
      <Paper variant="outlined" className={classes.root}>
        <Card>
          <CardContent className={classes.content}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Divider />
            {count ? (
              <Typography className={classes.countNum}>{count}</Typography>
            ) : (
              <CircularProgress />
            )}
          </CardContent>
          <CardActions>
            {url && urlName ? (
              <Link to={url}>
                <Button variant="outlined" color="primary" size="small">
                  {urlName}
                </Button>
              </Link>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => openModal()}
                size="small"
              >
                {btnName}
              </Button>
            )}
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
}
