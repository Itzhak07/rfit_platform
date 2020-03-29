import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

export const CheckBoxComponent = ({ client, checked, handleChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          key={client.email}
          checked={checked}
          onChange={handleChange}
          value={client.email}
          id={client._id}
          name={client.firstName + " " + client.lastName}
          label={client.firstName + " " + client.lastName}
          color="primary"
        />
      }
      label={client.firstName + " " + client.lastName}
    />
  );
};
