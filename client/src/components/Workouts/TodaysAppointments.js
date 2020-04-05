import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Face,
  FitnessCenter,
} from "@material-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  name: {
    fontWeight: 800,
  },
  mobileRoot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  mobileIcon: {
    minWidth: 35,
  },
}));

const DesktopView = ({ data }) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Client</TableCell>
            <TableCell align="left">Start</TableCell>
            <TableCell align="left">End</TableCell>
            <TableCell align="left">Workout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((workout) => {
            return (
              <TableRow key={workout.id}>
                <TableCell
                  className={classes.name}
                  component="th"
                  scope="row"
                  align="left"
                >
                  <Link to={`./dashboard/clients/${workout.client}`}>
                    <Chip label={workout.title} size="small" color="primary" />
                  </Link>
                </TableCell>
                <TableCell align="left">
                  {moment(workout.startDate).format("LT")}
                </TableCell>
                <TableCell align="left">
                  {moment(workout.endDate).format("LT")}
                </TableCell>
                <TableCell align="left">{workout.notes}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MobileView = ({ data }) => {
  const classes = useStyles();
  const MobileItems = ({ workout }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <Fragment>
        <ListItem divider button onClick={handleClick}>
          <ListItemText primary={moment(workout.startDate).format("LT")} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <ListItemIcon className={classes.mobileIcon}>
                <Face />
              </ListItemIcon>
              <ListItemText>
                <Link to={`./dashboard/clients/${workout.client}`}>
                  <Chip label={workout.title} size="small" color="primary" />
                </Link>
              </ListItemText>
              <ListItemText>
                {moment(workout.startDate).format("LT")} -
                {moment(workout.endDate).format("LT")}
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemIcon className={classes.mobileIcon}>
                <FitnessCenter />
              </ListItemIcon>
              <ListItemText primary={workout.notes}></ListItemText>
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    );
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.mobileRoot}
      dense
    >
      {data.map((workout) => {
        return <MobileItems workout={workout} />;
      })}
    </List>
  );
};

export default function TodaysAppointments({ data, setPageName, type }) {
  return isMobile ? <MobileView data={data} /> : <DesktopView data={data} />;
}
