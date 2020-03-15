import React from "react";
import { Link } from "react-router-dom";
import { Typography, Breadcrumbs } from "@material-ui/core";

const styles = {
  root: {
    marginBottom: 10
  },
  active: {
    fontWeight: 600
  }
};

export const ClientBreadCrumbs = ({ clientName }) => {
  return (
    <Breadcrumbs style={styles.root} aria-label="breadcrumb">
      <Link to="../clients">Clients Management</Link>
      <Typography color="primary" style={styles.active}>
        {clientName}
      </Typography>
    </Breadcrumbs>
  );
};
