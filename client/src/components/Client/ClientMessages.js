import React, { useState, useEffect } from "react";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs
} from "@material-ui/core";

import {
  MailOutline as MailOutlineIcon,
  Message as MessageIcon,
  ErrorOutline as ErrorOutlineIcon,
  ExpandLess,
  ExpandMore,
  WhatsApp as WhatsAppIcon
} from "@material-ui/icons/";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const NoMessages = ({ type }) => {
  const classes = useStyles();
  return (
    <ListItem button className={classes.nested}>
      <ListItemIcon>
        <ErrorOutlineIcon color="secondary" fontSize="large" />
      </ListItemIcon>
      <ListItemText primary={"No " + type} />
    </ListItem>
  );
};

const MessageItemList = ({ date, subject, message, type }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick} divider>
        <ListItemIcon>
          {type === 1 ? (
            <MailOutlineIcon color="primary" />
          ) : type === 2 ? (
            <WhatsAppIcon color="primary" />
          ) : (
            ""
          )}
        </ListItemIcon>
        <ListItemText primary={moment(date).format("L")} secondary={subject} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested} dense divider>
            <ListItemIcon>
              <MessageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={message} />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default function ClientMessages({ client, emails, whatsapps }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(value);
  });

  const emailListItems =
    emails.length > 0 ? (
      emails.map(email => {
        return (
          <MessageItemList
            date={email.date}
            message={email.message}
            subject={email.subject}
            type={email.type}
          />
        );
      })
    ) : (
      <NoMessages type="Emails" />
    );

  const whatsappListItems =
    whatsapps.length > 0 ? (
      whatsapps.map(whatsapp => {
        return (
          <MessageItemList
            date={whatsapp.date}
            message={whatsapp.message}
            subject={whatsapp.subject}
            type={whatsapp.type}
          />
        );
      })
    ) : (
      <NoMessages type="WhatsApp Messages" />
    );

  const setTabProps = index => {
    return {
      id: `message-type-tab-${index}`,
      "aria-controls": `message-type-tab-${index}`
    };
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="message-type-tab"
      >
        <Tab
          icon={<MailOutlineIcon />}
          label="Email"
          value={0}
          {...setTabProps(0)}
        />

        <Tab
          icon={<WhatsAppIcon />}
          label="WhatsApp"
          value={1}
          {...setTabProps(1)}
        />
      </Tabs>

      <div hidden={value !== 0}>
        <Scrollbars
          style={{
            width: "100%",
            height: 350
          }}
        >
          <List
            component="nav"
            aria-labelledby="client-email-list"
            className={classes.root}
          >
            {emailListItems}
          </List>
        </Scrollbars>
      </div>

      <div hidden={value !== 1}>
        <Scrollbars
          style={{
            width: "100%",
            height: 350
          }}
        >
          <List
            component="nav"
            aria-labelledby="client-email-list"
            className={classes.root}
          >
            {whatsappListItems}
          </List>
        </Scrollbars>
      </div>
    </div>
  );
}
