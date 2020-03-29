import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const AutocompleteComponent = ({ clients }) => {
  // const onChange=()=>{

  // }

  return (
    <div>
      <Autocomplete
        // multiple
        id="free-solo-2-demo"
        freeSolo
        disableClearable
        filterSelectedOptions
        options={clients.map(option => ({
          name: option.firstName + " " + option.lastName,
          email: option.email
        }))}
        getOptionLabel={option => option.name}
        ChipProps={{ color: "primary" }}
        onChange={e => console.log(e.target)}
        renderInput={params => (
          <TextField
            {...params}
            label="Search..."
            margin="normal"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    </div>
  );
};
