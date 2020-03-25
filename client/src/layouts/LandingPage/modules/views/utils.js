import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AppsIcon from "@material-ui/icons/Apps";

export const menuList = [
  { primary: "About", to: "about-section", offset: -100, icon: <InfoIcon /> },
  {
    primary: "Features",
    to: "features-section",
    offset: -50,
    icon: <AppsIcon />
  },
  {
    primary: "Contact",
    to: "contact-section",
    offset: -100,
    icon: <ContactSupportIcon />
  }
];
