import React from "react";
import { Typography, Link } from "@material-ui/core";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">RFit Platform</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
