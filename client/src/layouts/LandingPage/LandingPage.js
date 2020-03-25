import withRoot from "./modules/withRoot";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import MockUpSection from "./modules/views/MockUpSection";
import GetInTouch from "./modules/views/GetInTouch";
import AppFooter from "./modules/views/AppFooter";
import MainSection from "./modules/views/MainSection";
import ProductValues from "./modules/views/ProductValues";
import AppAppBar from "./modules/views/AppAppBar.js";
import { Element } from "react-scroll";
import { ButtonToTop } from "./modules/components/ButtonToTop";
import { ProductFeatures } from "./modules/views/ProductFeatures";
import { ContactUs } from "./modules/views/ContactUs";

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
      <Element name="main-section">
        <MainSection />
      </Element>
      <Element name="about-section">
        <MockUpSection />
      </Element>
      <ProductValues />
      <Element name="features-section">
        <ProductFeatures />
      </Element>
      <Element name="contact-section">
        <ContactUs />
      </Element>
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
