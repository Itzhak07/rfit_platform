import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #dad2d2"
  }
});

export const ClientProfile = ({ client }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Typography variant="subtitle2">Name</Typography>
        <Typography variant="h6">
          {client.firstName} {client.lastName}
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="subtitle2">Email</Typography>
        <Typography variant="h6">
          <a href={"mailto:" + client.email}>{client.email}</a>
        </Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="subtitle2">Phone</Typography>
        <Typography variant="h6">{client.phone}</Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="subtitle2">Gender</Typography>
        <Typography variant="h6">{client.gender}</Typography>
      </div>
      <div className={classes.item}>
        <Typography variant="subtitle2">Status</Typography>
        <Typography variant="h6">
          {client.status === 1 ? "Active" : "Not-Active"}
        </Typography>
      </div>
    </div>
  );
};
