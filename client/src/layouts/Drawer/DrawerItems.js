import React from "react";
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  Sports as SportsIcon,
  FitnessCenter as FitnessCenterIcon,
  Group as GroupIcon,
  AccountBox as AccountBoxIcon
} from "@material-ui/icons/";

export const drawerItems = [
  {
    key: 1,
    name: "Dashboard",
    viewName: "Dashboard",
    link: "/dashboard",
    icon: <DashboardIcon style={{ fontSize: 30 }} />,
    isCollapse: false
  },
  {
    key: 2,
    name: "Schedule",
    viewName: "Schedule",
    link: "/dashboard/schedule",
    icon: <CalendarIcon style={{ fontSize: 30 }} />,
    isCollapse: false
  },
  {
    key: 3,
    name: "Clients",
    viewName: "Clients Manager",
    link: "/dashboard/clients",
    icon: <GroupIcon style={{ fontSize: 30 }} />,
    isCollapse: false
  },
  {
    key: 4,
    name: "Workouts",
    icon: <FitnessCenterIcon style={{ fontSize: 30 }} />,
    state: "workouts",
    isCollapse: true,
    subMenu: [
      {
        key: 5,
        name: "Workouts Manager",
        viewName: "Workouts Manager",
        link: "/dashboard/workouts",
        icon: <SportsIcon style={{ fontSize: 30 }} />,
      }
    ]
  },
  {
    key: 6,
    name: "Account",
    viewName: "Account",
    link: "/dashboard/account",
    icon: <AccountBoxIcon style={{ fontSize: 30 }} />,
    isCollapse: false
  }
];
