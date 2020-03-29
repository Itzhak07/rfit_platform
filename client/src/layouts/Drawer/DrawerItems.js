import React from "react";
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  Sports as SportsIcon,
  FitnessCenter as FitnessCenterIcon,
  Group as GroupIcon,
  AccountBox as AccountBoxIcon,
  Email as EmailIcon,
  Send as SendIcon,
  Forum as ForumIcon
} from "@material-ui/icons/";

const iconStyle = {
  fontSize: 30
};

export const drawerItems = [
  {
    key: 1,
    name: "Dashboard",
    viewName: "Dashboard",
    link: "/dashboard",
    icon: <DashboardIcon style={iconStyle} />,
    isCollapse: false
  },
  {
    key: 2,
    name: "Schedule",
    viewName: "Schedule",
    link: "/dashboard/schedule",
    icon: <CalendarIcon style={iconStyle} />,
    isCollapse: false
  },
  {
    key: 3,
    name: "Clients",
    viewName: "Clients Manager",
    link: "/dashboard/clients",
    icon: <GroupIcon style={iconStyle} />,
    isCollapse: false
  },
  {
    key: 4,
    name: "Workouts",
    icon: <FitnessCenterIcon style={iconStyle} />,
    state: "workouts",
    isCollapse: true,
    subMenu: [
      {
        key: 5,
        name: "Workouts Manager",
        viewName: "Workouts Manager",
        link: "/dashboard/workouts",
        icon: <SportsIcon />
      }
    ]
  },
  {
    key: 6,
    name: "Messages",
    icon: <EmailIcon style={iconStyle} />,
    state: "messages",
    isCollapse: true,
    subMenu: [
      {
        key: 7,
        name: "Messages Center",
        viewName: "Messages Center",
        link: "/dashboard/messages",
        icon: <ForumIcon />
      },
      {
        key: 8,
        name: "New Message",
        viewName: "New Message",
        link: "/dashboard/messages/new",
        icon: <SendIcon />
      }
    ]
  },
  {
    key: 9,
    name: "Account",
    viewName: "Account",
    link: "/dashboard/account",
    icon: <AccountBoxIcon style={iconStyle} />,
    isCollapse: false
  }
];
