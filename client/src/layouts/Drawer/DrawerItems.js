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
    name: "Dashboard",
    viewName: "Dashboard",
    link: "/dashboard",
    icon: <DashboardIcon style={{ fontSize: 30 }} />,
    isCollapse: false
  },
  {
    name: "Schedule",
    viewName: "Schedule",
    link: "/dashboard/schedule",
    icon: <CalendarIcon style={{ fontSize: 30 }} />,
    isCollapse: false
  },
  {
    name: "Clients",
    viewName: "Clients Manager",
    link: "/dashboard/clients",
    icon: <GroupIcon style={{ fontSize: 30 }} />,
    isCollapse: false
  },
  {
    name: "Workouts",
    icon: <FitnessCenterIcon style={{ fontSize: 30 }} />,
    state: "workouts",
    isCollapse: true,
    subMenu: [
      {
        name: "Workouts Manager",
        viewName: "Workouts Manager",
        link: "/dashboard/workouts",
        icon: <SportsIcon style={{ fontSize: 30 }} />,
        key: 1
      }
    ]
  },
  {
    name: "Account",
    viewName: "Account",
    link: "/dashboard/account",
    icon: <AccountBoxIcon style={{ fontSize: 30 }} />,
    isCollapse: false
  }
];
