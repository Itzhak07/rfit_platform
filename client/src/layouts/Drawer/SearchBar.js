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
    right: 5,
    cursor: "pointer"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
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
  },
  loading: {
    padding: 10
  }
}));

function useOutsideAlerter(ref, setResult) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setResult({ clientResults: "Search...", show: false });
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

const SearchBar = ({ clients }) => {
  const [result, setResult] = useState({
    show: false,
    clientResults: "",
    searching: true
  });
  const [value, setValue] = useState("");
  const { show, clientResults, searching } = result;
  const classes = useStyles();
  const wrapperRef = useRef(null);
  const [debouncedCallback] = useDebouncedCallback(value => {
    if (value.length > 0) {
      const searchMatch = clients.filter(client => {
        return (
          !client.firstName.toLowerCase().indexOf(value.toLowerCase()) ||
          !client.lastName.toLowerCase().indexOf(value.toLowerCase()) ||
          !client.email.toLowerCase().indexOf(value.toLowerCase()) ||
          !(client.firstName + " " + client.lastName)
            .toLocaleLowerCase()
            .indexOf(value.toLowerCase())
        );
      });

      if (searchMatch.length === 0) {
        setResult({
          clientResults: `No results found for "${value}"`,
          show: true,
          searching: false
        });
      } else {
        setResult({ clientResults: searchMatch, show: true, searching: false });
      }
    } else {
      setResult({ clientResults: "", show: false, searching: false });
    }
  }, 500);

  const handleChange = value => {
    setValue(value);
    setResult({
      ...clientResults,
      show: true,
      searching: true
    });
    debouncedCallback(value);
  };

  const linkClick = () => {
    setValue("");
    setResult({ ...clientResults, show: false, searching: false });
  };

  useOutsideAlerter(wrapperRef, setResult);

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
          onChange={e => handleChange(e.target.value)}
          endAdornment={
            value ? (
              <ClearIcon
                className={classes.xIcon}
                fontSize="small"
                onClick={() => setValue("")}
              />
            ) : (
              ""
            )
          }
        />
      </div>
      <Paper ref={wrapperRef} className={show ? classes.show : classes.hide}>
        {searching ? (
          <div className={classes.loading}>
            <CircularProgress size={25} />
          </div>
        ) : !searching && Array.isArray(clientResults) ? (
          <List
            component="nav"
            aria-label="main mailbox folders"
            subheader={
              <ListSubheader color="primary" component="div" id="Clients">
                Clients
              </ListSubheader>
            }
          >
            {clientResults.map(match => {
              return (
                <Link
                  to={
                    "https://rfit-platform.herokuapp.com/dashboard/clients/" +
                    match._id
                  }
                  onClick={linkClick}
                  key={match._id}
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
          <div className={classes.matchMessage}>{clientResults}</div>
        )}
      </Paper>
    </div>
  );
};

SearchBar.propTypes = {
  clients: PropTypes.array
};

const mapStateToPros = state => ({
  clients: state.clients.clients
});

export default connect(mapStateToPros, {})(SearchBar);
