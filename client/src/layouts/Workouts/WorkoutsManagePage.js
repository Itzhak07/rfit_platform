import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout
} from "../../actions/workoutActions";

import WorkoutsTable from "../../components/Workouts/workoutsTable";
import { BigLogoSpinner } from "../Loader/Loaders";
import MenuButton from "../../components/Buttons/MenuButton";
import { setPageName } from "../../actions/pageActions";

const AllWorkoutsPage = ({
  createWorkout,
  deleteWorkout,
  updateWorkout,
  setPageName,
  workouts,
  clients,
  loading,
  alerts
}) => {
  useEffect(() => {
    setPageName("Workouts Manager");
  }, [setPageName]);

  return (
    <div className="conatiner">
      {loading ? (
        <BigLogoSpinner />
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
      <MenuButton addWorkout />
    </div>
  );
};

AllWorkoutsPage.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  updateWorkout: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
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
  updateWorkout,
  setPageName
})(AllWorkoutsPage);
