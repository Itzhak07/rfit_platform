import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createClient, updateClient } from "../actions/clientActions";
import ClientsTable from "../components/ClientsTable";
import { Spinner } from "./Spinner";

const ClientsManagePage = ({
  createClient,
  updateClient,
  clients,
  loading,
  alerts
}) => {
  return (
    <div className="conatiner">
      {loading ? (
        <Spinner />
      ) : (
        <ClientsTable
          clients={clients}
          createClient={createClient}
          updateClient={updateClient}
          alerts={alerts}
        />
      )}
    </div>
  );
};

ClientsManagePage.propTypes = {
  clients: PropTypes.array.isRequired,
  createClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  clients: state.clients.clients,
  loading: state.clients.loading,
  alerts: state.alerts.alerts
});

export default connect(mapStateToProps, {
  createClient,
  updateClient
})(ClientsManagePage);
