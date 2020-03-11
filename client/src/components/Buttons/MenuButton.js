import React, { useState, lazy, Suspense } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Zoom,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Menu,
  Button,
  CircularProgress
} from "@material-ui/core";
import {
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  FitnessCenter as FitnessCenterIcon
} from "@material-ui/icons/";
const AddModal = lazy(() => import(/* webpackChunkName: "AuthModal"*/"../../layouts/Modal/AddModal"));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    disableAutoFocusItem
    elevation={20}
    getContentAnchorEl={null}
    TransitionComponent={Zoom}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const useStyles = makeStyles({
  root: {
    position: "fixed",
    right: 32,
    bottom: 24,
    zIndex: 2
  },
  button: {
    borderRadius: "50%",
    height: 60,
    width: 56
  },
  icon: {
    fontSize: "1.5rem"
  }
});

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function MenuButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState();
  const classes = useStyles();

  const modalOpen = type => {
    setOpen(true);
    setFormType(type);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="secondary"
        onClick={handleClick}
        className={classes.button}
        variant="contained"
      >
        <AddIcon className={classes.icon} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => modalOpen("Client")}>
          <ListItemIcon>
            <PersonAddIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="New Client" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => modalOpen("Workout")}>
          <ListItemIcon>
            <FitnessCenterIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="New Workout" />
        </StyledMenuItem>
      </StyledMenu>

      <Suspense fallback={<CircularProgress />}>
        <AddModal open={open} closeModal={modalClose} closeMenu={handleClose} type={formType} />
      </Suspense>
    </div>
  );
}
