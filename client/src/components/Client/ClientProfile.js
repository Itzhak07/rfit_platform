import React from "react";
import {
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  PermIdentity as NameIcon,
  Email as EmailIcon,
  PhoneIphone as PhoneIcon,
  Wc as GenderIcon,
  CheckCircleOutline as ActiveIcon,
  ErrorOutline as NotActiveIcon,
  StarRate as TopClientIcon
} from "@material-ui/icons";

export const ClientProfile = ({ client, topClients }) => {
  const isTopClient =
    topClients !== null
      ? topClients.filter(topClient => {
          return topClient.id === client._id;
        })
      : "";

  console.log(isTopClient);

  const ListItemsOptions = [
    {
      primary: "Name",
      secondary: `${client.firstName} ${client.lastName}`,
      icon: <NameIcon />
    },
    {
      primary: "Email",
      secondary: client.email,
      icon: <EmailIcon />
    },
    {
      primary: "Phone",
      secondary: client.phone,
      icon: <PhoneIcon />
    },
    {
      primary: "Gender",
      secondary: `${client.gender}`,
      icon: <GenderIcon />
    },
    {
      primary: "Status",
      secondary: client.status === 1 ? "Active" : "Not-Active",
      icon: client.status === 1 ? <ActiveIcon /> : <NotActiveIcon />
    }
  ];

  const listItems = ListItemsOptions.map(item => {
    return (
      <ListItem divider>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.primary} secondary={item.secondary} />
      </ListItem>
    );
  });

  return (
    <List
      component="nav"
      aria-labelledby="client-profile-list"
      subheader={
        <ListSubheader disableGutters component="div" id="client-profile-list">
          {isTopClient.length ? (
            <TopClientIcon
              fontSize="large"
              style={{ position: "relative", top: 10, color: "#ffb100" }}
            />
          ) : (
            ""
          )}{" "}
          Profile
        </ListSubheader>
      }
    >
      {listItems}
    </List>
  );
};
