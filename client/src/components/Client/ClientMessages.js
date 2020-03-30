import React, { useState } from "react";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import {
  MailOutline as MailOutlineIcon,
  Message as MessageIcon,
  ErrorOutline as ErrorOutlineIcon,
  ExpandLess,
  ExpandMore
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

const EmailItemList = ({ date, subject, message }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick} divider>
        <ListItemIcon>
          <MailOutlineIcon color="primary" />
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

export default function ClientMessages({ client, emails }) {
  const classes = useStyles();

  const listItems =
    emails.length > 0 ? (
      emails.map(email => {
        return (
          <EmailItemList
            date={email.date}
            message={email.message}
            subject={email.subject}
          />
        );
      })
    ) : (
      <ListItem button className={classes.nested} dense>
        <ListItemIcon>
          <ErrorOutlineIcon color="secondary" fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="No Messages" />
      </ListItem>
    );

  return (
    <Scrollbars
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <List
        component="nav"
        aria-labelledby="client-email-list"
        subheader={
          <ListSubheader component="div" id="client-email-list">
            Messages
          </ListSubheader>
        }
        className={classes.root}
      >
        {listItems}
      </List>
    </Scrollbars>
  );
}
