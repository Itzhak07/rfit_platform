import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  InputBase,
  Divider,
  ListItem,
  List,
  ListItemText,
  ListSubheader,
  Paper,
  CircularProgress
} from "@material-ui/core";
import { Search as SearchIcon, Clear as ClearIcon } from "@material-ui/icons";
import { fade, makeStyles } from "@material-ui/core/styles";

import { useDebouncedCallback } from "use-debounce";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: 20,
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: 150,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
      width: 180
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  xIcon: {
    position: "absolute",
    top: 7,
    right: 5
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  show: {
    opacity: 1,
    maxHeight: 600,
    width: 300,
    position: "absolute",
    transition: "all 0.3s ease"
  },
  hide: {
    opacity: 0,
    position: "absolute",
    top: -500,
    transition: "all 0.3s ease"
  },
  matchMessage: {
    fontSize: "1rem",
    fontWeight: 400,
    padding: 16
  }
}));

function useOutsideAlerter(ref, setResult) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setResult({ results: "Search...", show: false });
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

const SearchBar = ({ clients }) => {
  const [result, setResult] = useState({
    show: false,
    results: ""
  });
  const [value, setValue] = useState("");
  const { show, results } = result;
  const classes = useStyles();
  const wrapperRef = useRef(null);
  const [debouncedCallback] = useDebouncedCallback(value => {
    if (value.length > 0) {
      const searchMatch = clients.filter(client => {
        return (
          !client.firstName.toLowerCase().indexOf(value.toLowerCase()) ||
          !client.lastName.toLowerCase().indexOf(value.toLowerCase()) ||
          !client.email.toLowerCase().indexOf(value.toLowerCase())
        );
      });

      if (searchMatch.length === 0) {
        setResult({ results: `No results found for "${value}"`, show: true });
      } else {
        setResult({ results: searchMatch, show: true });
      }
    } else {
      setResult({ results: "Search...", show: false });
    }
  }, 500);
  useOutsideAlerter(wrapperRef, setResult);

  const handleChange = value => {
    setValue(value);
    setResult({ results: <CircularProgress size={25} />, show: true });
    debouncedCallback(value);
  };

  const linkClick = () => {
    setValue("");
    setResult({ ...results, show: false });
  };

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={value}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={
            // (e => debouncedCallback(e.target.value),
            // e => setValue(e.target.value))
            e => handleChange(e.target.value)
          }
        />
        {value ? (
          <ClearIcon
            className={classes.xIcon}
            fontSize="small"
            onClick={() => setValue("")}
          />
        ) : (
          ""
        )}
      </div>
      <Paper
        ref={wrapperRef}
        // elevation={3}
        className={show ? classes.show : classes.hide}
      >
        {Array.isArray(results) ? (
          <List
            component="nav"
            aria-label="main mailbox folders"
            subheader={
              <ListSubheader color="primary" component="div" id="Clients">
                Clients
              </ListSubheader>
            }
          >
            {/* <Divider /> */}
            {results.map(match => {
              return (
                <Link
                  to={"./dashboard/clients/" + match._id}
                  onClick={linkClick}
                >
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary={match.firstName + " " + match.lastName}
                      secondary={match.email}
                    />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        ) : (
          <div className={classes.matchMessage}>{results}</div>
        )}
      </Paper>
    </div>
  );
};

SearchBar.propTypes = {
  clients: PropTypes.array.isRequired
};

const mapStateToPros = state => ({
  clients: state.clients.clients
});

export default connect(mapStateToPros, {})(SearchBar);
