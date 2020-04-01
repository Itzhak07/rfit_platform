import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createClient, updateClient } from "../../actions/clientActions";
import ClientsTable from "../../components/Client/ClientsTable";
import { BigLogoSpinner } from "../Loader/Loaders";
import MenuButton from "../../components/Buttons/MenuButton";
import { setPageName } from "../../actions/pageActions";

const ClientsManagePage = ({
  createClient,
  updateClient,
  clients,
  loading,
  alerts,
  setPageName
}) => {
  useEffect(() => {
    setPageName("Clients Manager");
  }, [setPageName]);

  return (
    <div className="conatiner">
      {loading ? (
        <BigLogoSpinner />
      ) : (
        <ClientsTable
          clients={clients}
          createClient={createClient}
          updateClient={updateClient}
          alerts={alerts}
        />
      )}
      <MenuButton addClient />
    </div>
  );
};

ClientsManagePage.propTypes = {
  clients: PropTypes.array.isRequired,
  createClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
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
  updateClient,
  setPageName
})(ClientsManagePage);
