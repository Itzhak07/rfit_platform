import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import MockUpSection from "./modules/views/MockUpSection";
import GetInTouch from "./modules/views/GetInTouch";
import AppFooter from "./modules/views/AppFooter";
import MainSection from "./modules/views/MainSection";
import ProductValues from "./modules/views/ProductValues";
import Subscribe from "./modules/views/Subscribe";
import AppAppBar from "./modules/views/AppAppBar.js";
import { Element } from "react-scroll";
import { ButtonToTop } from "./modules/components/ButtonToTop";

function LandingPage({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const rootStyle = {
    overflowX: "hidden"
  };

  return (
    <div style={rootStyle}>
      <AppAppBar />
      <MainSection />
      <Element name="mockup-section">
        <MockUpSection />
      </Element>
      <ProductValues />
      <Subscribe />
      <GetInTouch />
      <ButtonToTop />
      <AppFooter />
    </div>
  );
}

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToPros = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToPros)(withRoot(LandingPage));
