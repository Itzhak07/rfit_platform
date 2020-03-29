import React from "react";
import { Chip, makeStyles } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles({
  root: {
    margin: 5
  }
});

export const ChipComponent = ({ client, handleDelete }) => {
  const classes = useStyles();
  return (
    <Chip
      variant="outlined"
      size="small"
      label={client.name}
      onDelete={() => handleDelete(client.email)}
      color="primary"
      icon={<FaceIcon />}
      className={classes.root}
    />
  );
};
