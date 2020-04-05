import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

export default function ModalToolbar({ closeModal }) {
  return (
    <AppBar style={{ position: "relative" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={closeModal}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
