import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-scroll";
import {
  List,
  Button,
  ListItem,
  ListItemText,
  Drawer
} from "@material-ui/core/";

import { menuList } from "../views/utils";

const useStyles = makeStyles({
  list: {
    width: "100%"
  },
  listItem: {
    textAlign: "center"
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
      {menuList.map((item, index) => {
        return (
          <Link
            className={classes.rightLink}
            to={item.to}
            spy={true}
            smooth={true}
            offset={item.offset}
            duration={500}
            onClick={setOpen}
            key={index}
          >
            <ListItem divider button className={classes.listItem}>
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
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer anchor="bottom" open={open} onClose={setOpen} onOpen={setOpen}>
        {list}
      </Drawer>
    </div>
  );
}
