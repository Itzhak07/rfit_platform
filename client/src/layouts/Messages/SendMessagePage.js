import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPageName } from "../../actions/pageActions";
import SendMailForm from "./components/SendMailForm";

const SendMessagePage = ({ setPageName }) => {
  useEffect(() => {
    setPageName("New Message");
  }, [setPageName]);

  return <SendMailForm />;
};

SendMessagePage.propTypes = {
  setPageName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  setPageName
})(SendMessagePage);
