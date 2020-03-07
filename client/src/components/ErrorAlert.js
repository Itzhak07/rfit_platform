import React from "react";
import ErrorIcon from "@material-ui/icons/Error";

const style = {
  maxWidth: "600px"
};

export default function ErrorAlert({ message }) {
  return (
    <div className="stylealert alert alert-danger" style={style}>
      <ErrorIcon /> {message}
    </div>
  );
}
