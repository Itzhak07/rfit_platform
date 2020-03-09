import React from "react";
import ErrorIcon from "@material-ui/icons/Error";

const rootStyle = {
  maxWidth: 600,
  height: 40,
  background: "#ff3366",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  padding: 10,
  color: "white"
};

const iconStyle = {
  marginRight: 5
};

export default function ErrorAlert({ message }) {
  return (
    <div style={rootStyle}>
      <ErrorIcon style={iconStyle} /> {message}
    </div>
  );
}
