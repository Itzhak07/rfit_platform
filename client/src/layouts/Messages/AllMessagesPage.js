import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPageName } from "../../actions/pageActions";
import AllMessagesTable from "./components/allMessagesTable";

const AllMessagesPage = ({ setPageName }) => {
  useEffect(() => {
    setPageName("Messages Center");
  }, [setPageName]);

  return <AllMessagesTable />;
};

AllMessagesPage.propTypes = {
  setPageName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  setPageName
})(AllMessagesPage);
