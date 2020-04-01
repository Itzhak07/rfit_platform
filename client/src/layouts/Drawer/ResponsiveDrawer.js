import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
  Avatar
} from "@material-ui/core/";

import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons/";

import logo from "../../assets/images/logo.png";
import { drawerItems } from "./DrawerItems";
import { Spring, config } from "react-spring/renderprops";
import { isMobile } from "react-device-detect";
import SearchBar from "./SearchBar";
import { BigLogoSpinner, CircularLoader } from "../Loader/Loaders";

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
    width: 114,
    position: "relative",
    top: 5
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
    padding: theme.spacing(3),
    width: "100%"
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
      paddingLeft: 5,
      transition: "all 0.3s ease"
    }
  },
  active: {
    transition: "all 0.3s ease-in",
    borderLeft: "7px solid #3f51b5"
  }
}));

function ResponsiveDrawer({
  container,
  children,
  logout,
  auth: { user },
  pageName
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState();
  const [open, setOpen] = useState({
    messages:
      pageName === "New Message" || pageName === "Messages Center"
        ? true
        : false,
    workouts: pageName === "Workouts Manager" ? true : false
  });

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  useEffect(() => {
    setActive(pageName);
    if (pageName === "Workouts Manager") {
      setOpen(open => ({ ...open, workouts: true }));
    } else {
      setOpen(open => ({ ...open, workouts: false }));
    }
    if (pageName === "New Message" || pageName === "Messages Center") {
      setOpen(open => ({ ...open, messages: true }));
    } else {
      setOpen(open => ({ ...open, messages: false }));
    }
  }, [pageName]);

  const openCollapse = state => {
    setOpen({ ...open, [state]: !open[state] });
  };

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
          <CircularLoader width={40} height={40} />
        </div>
      )}
      <Divider />
      <List disablePadding>
        {drawerItems.map(item => {
          return (
            <div
              key={item.name}
              className={active === item.viewName ? classes.active : ""}
            >
              {!item.isCollapse ? (
                <Link
                  to={item.link}
                  onClick={() => {
                    if (isMobile) {
                      setMobileOpen(false);
                    }
                  }}
                >
                  <ListItem button className={classes.listItem} divider>
                    <div className={classes.itemBalckBar} />
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ) : (
                <div>
                  <ListItem
                    button
                    onClick={() => openCollapse(item.state)}
                    className={classes.listItem}
                    divider
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                    {open[item.state] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open[item.state]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subMenu.map(subitem => {
                        return (
                          <div
                            key={subitem.key}
                            className={` ${
                              active === subitem.viewName ? classes.active : ""
                            }  ${classes.collapsed}`}
                          >
                            <Link
                              to={subitem.link}
                              onClick={() => {
                                if (isMobile) {
                                  setMobileOpen(false);
                                }
                              }}
                            >
                              <ListItem
                                button
                                className={classes.nested}
                                divider
                              >
                                <ListItemIcon>{subitem.icon}</ListItemIcon>
                                <ListItemText primary={subitem.name} />
                              </ListItem>
                            </Link>
                          </div>
                        );
                      })}
                    </List>
                  </Collapse>
                </div>
              )}
            </div>
          );
        })}
      </List>
    </div>
  );

  const toolbar = (
    <Spring
      from={{ opacity: 0, marginTop: -500 }}
      to={{ opacity: 1, marginTop: 0 }}
      config={config.slow}
    >
      {props => (
        <Toolbar style={props}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {!isMobile ? (
            <Typography className={classes.pageName} variant="h6" noWrap>
              {pageName}
            </Typography>
          ) : (
            ""
          )}
          <SearchBar />
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
      )}
    </Spring>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        {toolbar}
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
        <Suspense fallback={<BigLogoSpinner />}>{children}</Suspense>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.object,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  pageName: PropTypes.string.isRequired
};

const mapStateToPros = state => ({
  auth: state.auth,
  pageName: state.page.pageName
});

export default connect(mapStateToPros, { logout })(ResponsiveDrawer);
