import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import {
  AppBar,
  IconButton,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Toolbar,
  makeStyles,
  useTheme,
  Button,
  Avatar,
  CircularProgress
} from "@material-ui/core/";

import { Link } from "react-router-dom";

import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  Menu as MenuIcon,
  Sports as SportsIcon,
  FitnessCenter as FitnessCenterIcon,
  Group as GroupIcon,
  ExitToApp as ExitToAppIcon,
  AccountBox as AccountBoxIcon,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons/";

import logo from "../../assets/images/logo.png";

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundImage:
      "linear-gradient(to right, #000000, #141414, #202020, #2d2d2d, #3b3b3b)",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      flexGrow: 1
    }
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,

  logoWrapper: {
    textAlign: "center"
  },

  logo: {
    width: "42%"
  },
  pageName: {
    flexGrow: 1
  },
  logout: {
    color: "white"
  },
  user: {
    textAlign: "center",
    padding: "10px 0"
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: "auto"
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  listItem: {
    padding: "15px 0 15px 15px;",
    transition: "all 0.3s ease",
    "&:hover": {
      padding: "20px 0 20px 15px",
      transition: "all 0.3s ease"
    }
  },
  listIcon: {
    fontSize: 30
  },
  collapsed: {
    transition: "all 0.3s ease",
    "&:hover": {
      paddingLeft: 10,
      transition: "all 0.3s ease"
    }
  }
}));

function ResponsiveDrawer({ container, children, logout, auth: { user } }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageName, setPageName] = useState();
  const [open, setOpen] = useState({
    workouts: false,
    clients: false
  });

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const onViewChange = viewName => {
    setPageName(viewName);
    localStorage.setItem("lastPageView", viewName);
  };

  useEffect(() => {
    const viewName = localStorage.getItem("lastPageView");
    setPageName(viewName);
  }, []);

  const openCollapse = state => {
    setOpen({ ...open, [state]: !open[state] });
  };

  const drawerItems = [
    {
      name: "Dashboard",
      viewName: "Dashboard",
      link: "/dashboard",
      icon: <DashboardIcon className={classes.listIcon} />
    },
    {
      name: "Schedule",
      viewName: "Schedule",
      link: "/dashboard/schedule",
      icon: <CalendarIcon className={classes.listIcon} />
    },
    {
      name: "Clients",
      viewName: "Clients Manager",
      link: "/dashboard/clients",
      icon: <GroupIcon className={classes.listIcon} />
    }
  ];

  const collapsedItems = [
    {
      name: "Workouts",
      icon: <FitnessCenterIcon className={classes.listIcon} />,
      state: "workouts",
      subMenu: [
        {
          name: "Workouts Manager",
          viewName: "Workouts Manager",
          link: "/dashboard/workouts",
          icon: <SportsIcon className={classes.listIcon} />,
          key: 1
        }
      ]
    }
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className={classes.logoWrapper}>
          <img className={classes.logo} src={logo} title="logo" alt="logo" />
        </div>
      </div>
      <Divider />

      {user ? (
        <div className={classes.user}>
          <Avatar alt="Avatar" src={user.avatar} className={classes.avatar} />
          <Typography variant="h6">
            {user.firstName} {user.lastName}
          </Typography>
        </div>
      ) : (
        <div className={classes.user}>
          <CircularProgress />
        </div>
      )}
      <Divider />
      <List disablePadding>
        {drawerItems.map(item => {
          return (
            <div>
              <Link
                to={item.link}
                onClick={() => {
                  onViewChange(item.viewName);
                }}
              >
                <ListItem button className={classes.listItem}>
                  <div className={classes.itemBalckBar} />
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
              <Divider />
            </div>
          );
        })}
        {collapsedItems.map(item => (
          <Fragment>
            <ListItem
              button
              key={item.key}
              onClick={() => openCollapse(item.state)}
              className={classes.listItem}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
              {open[item.state] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider />
            <Collapse in={open[item.state]} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                className={classes.collapsed}
              >
                {item.subMenu.map(subitem => {
                  return (
                    <div>
                      <Link
                        key={subitem.key}
                        to={subitem.link}
                        onClick={() => {
                          onViewChange(subitem.viewName);
                        }}
                      >
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>{subitem.icon}</ListItemIcon>
                          <ListItemText primary={subitem.name} />
                        </ListItem>
                      </Link>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </Collapse>
            <Link
              to="/dashboard/account"
              onClick={() => {
                onViewChange("Account");
              }}
            >
              <ListItem button className={classes.listItem}>
                <ListItemIcon>
                  <AccountBoxIcon className={classes.listIcon} />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
            </Link>
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.pageName} variant="h6" noWrap>
            {pageName}
          </Typography>
          <Link to="/">
            <Button
              className={classes.logout}
              onClick={logout}
              color="default"
              size="small"
              endIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.object,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToPros = state => ({
  auth: state.auth
});

export default connect(mapStateToPros, { logout })(ResponsiveDrawer);
