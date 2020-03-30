import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPageName } from "../../actions/pageActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  name: {
    fontWeight: 800
  }
});

function SimpleWorkoutsTable({ data, setPageName }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Start</TableCell>
            <TableCell align="left">End</TableCell>
            <TableCell align="left">Workout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(workout => (
            <TableRow key={workout.id}>
              <TableCell
                className={classes.name}
                component="th"
                scope="row"
                align="left"
              >
                <Link
                  to={`./dashboard/clients/${workout.client}`}
                  onClick={() => setPageName("Clients Manager")}
                >
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleWorkoutsTable.propTypes = {
  setPageName: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.clients.loading
});

export default connect(mapStateToProps, { setPageName })(SimpleWorkoutsTable);
