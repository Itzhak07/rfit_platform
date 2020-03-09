import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout
} from "../../actions/workoutActions";
import WorkoutsTable from "../../components/Workouts/workoutsTable";
import { Spinner } from "../Loader/Spinner";

const AllWorkoutsPage = ({
  createWorkout,
  deleteWorkout,
  updateWorkout,

  workouts,
  clients,
  loading,
  alerts
}) => {
  return (
    <div className="conatiner">
      {loading ? (
        <Spinner />
      ) : (
        <WorkoutsTable
          workouts={workouts}
          clients={clients}
          createWorkout={createWorkout}
          deleteWorkout={deleteWorkout}
          updateWorkout={updateWorkout}
          alerts={alerts}
        />
      )}
    </div>
  );
};

AllWorkoutsPage.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  updateWorkout: PropTypes.func.isRequired,
  workouts: PropTypes.array.isRequired,
  clients: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  workouts: state.workouts.workouts,
  clients: state.clients.clients,
  loading: state.workouts.loading,
  alerts: state.alerts.alerts
});

export default connect(mapStateToProps, {
  createWorkout,
  deleteWorkout,
  updateWorkout
})(AllWorkoutsPage);
