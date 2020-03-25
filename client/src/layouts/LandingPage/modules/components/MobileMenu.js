import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-scroll";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Drawer } from "@material-ui/core";
import { menuList } from "../views/utils";

const useStyles = makeStyles({
  list: {
    width: "100%"
  },
  listItem: {
    margin: "auto"
  },
  rightLink: {
    fontSize: 14,
    color: "black",
    "&:hover": {
      color: "#dcdcdc"
    }
  },
  menuButton: {
    height: "100%",
    color: "white",
    fontSize: 30
  }
});

export default function MobileMenu({ open, setOpen }) {
  const classes = useStyles();

  const list = (
    <List
      className={classes.list}
      component="div"
      aria-label="mobile-menu-list"
    >
      {menuList.map(item => {
        return (
          <Link
            className={classes.rightLink}
            to={item.to}
            spy={true}
            smooth={true}
            offset={item.offset}
            duration={500}
            onClick={setOpen}
          >
            <ListItem divider button className={classes.listItem}>
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.primary} />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );

  return (
    <div>
      <Button onClick={setOpen} className={classes.menuButton}>
        <MenuIcon />
      </Button>
      <Drawer anchor="top" open={open} onClose={setOpen} onOpen={setOpen}>
        {list}
      </Drawer>
    </div>
  );
}
