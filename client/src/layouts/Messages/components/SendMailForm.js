import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  TextField,
  Container,
  FormLabel,
  Button,
  makeStyles,
  Divider,
  FormControlLabel,
  Switch,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ChipComponent } from "./ChipComponent";
import { CheckBoxComponent } from "./CheckBoxComponent";
import { AutocompleteComponent } from "./AutocompleteComponent";
import {
  Send as SendIcon,
  MailOutline as MailOutlineIcon,
  People as PeopleIcon
} from "@material-ui/icons";
import { Scrollbars } from "react-custom-scrollbars";
import { sendEmail } from "../../../actions/messageActions";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "row wrap"
  },
  paper: {
    padding: 20
  },
  form: {
    width: 800,
    height: "100%",
    padding: 20,
    borderRight: "dotted",
    transition: "all 0.3s ease",
    [theme.breakpoints.down("lg")]: {
      width: 700,
      transition: "all 0.3s ease"
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: "unset",
      borderBottom: "dotted",
      transition: "all 0.3s ease"
    }
  },
  label: {
    minHeight: 20
  },
  input: {
    margin: "10px 0"
  },
  checkbox: {
    width: 270,
    height: 470,
    maxHeight: 470,
    padding: 20,
    // overflow: "auto",
    transition: "all 0.3s ease",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      // marginTop: 10,
      transition: "all 0.3s ease"
    }
  },
  title: {
    marginBottom: 10
  },
  titleIcon: {
    position: "relative",
    top: 8,
    marginRight: 5
  }
}));

const SendMailForm = ({ sendEmail, clients, isNewMessage, closeModal }) => {
  const [formData, setFormData] = useState({
    subject: "",
    to: [],
    message: ""
  });

  const classes = useStyles();
  const { subject, to, message } = formData;
  const inputRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      const thisClient = clients.filter(client => {
        return client._id === id;
      });

      setFormData({
        ...formData,
        to: [
          {
            name: `${thisClient[0].firstName} ${thisClient[0].lastName}`,
            email: thisClient[0].email,
            id: thisClient[0]._id
          }
        ]
      });
    }
  }, [id]);

  useEffect(() => {
    if (isNewMessage && closeModal) {
      closeModal();
    }
  }, [isNewMessage, closeModal]);

  const handleChange = event => {
    if (event.target.type === "checkbox") {
      if (event.target.checked) {
        setFormData({
          ...formData,
          to: [
            ...to,
            {
              name: event.target.name,
              email: event.target.value,
              id: event.target.id
            }
          ]
        });
      } else {
        setFormData({
          ...formData,
          to: to.filter(client => {
            return client.email !== event.target.value;
          })
        });
      }
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleCheckAll = () => {
    if (to.length < clients.length) {
      let allClients = clients.map(client => {
        return {
          name: client.firstName + " " + client.lastName,
          email: client.email,
          id: client._id
        };
      });
      setFormData({ ...formData, to: allClients });
    } else {
      setFormData({ ...formData, to: [] });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    sendEmail(formData);
    setFormData({ subject: "", to: [], message: "" });
  };

  const handleDelete = clientEmail => {
    setFormData({
      ...formData,
      to: to.filter(client => {
        return client.email !== clientEmail;
      })
    });
  };

  let clientsCheckBox =
    clients != null
      ? clients.map(client => {
          return (
            <div>
              <CheckBoxComponent
                client={client}
                checked={
                  to.find(key => key.email === client.email) ? true : false
                }
                handleChange={handleChange}
              />
              <Divider />
            </div>
          );
        })
      : "";

  const clientsChips =
    to != null
      ? to.map(client => {
          return <ChipComponent client={client} handleDelete={handleDelete} />;
        })
      : "";

  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Paper className={classes.form}>
          <Typography gutterBottom variant="h5">
            <MailOutlineIcon
              fontSize="large"
              color="primary"
              className={classes.titleIcon}
            />
            New Message
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField
              id="filled-basic"
              label="Subject"
              variant="outlined"
              name="subject"
              onChange={handleChange}
              value={subject}
              fullWidth
              className={classes.input}
            />

            <FormLabel className={classes.label} component="div">
              To
              {/* <AutocompleteComponent clients={clients} /> */}
              <div>{clientsChips}</div>
            </FormLabel>

            <TextField
              ref={inputRef}
              id="filled-basic2"
              label="Message"
              variant="outlined"
              name="message"
              onChange={handleChange}
              value={message}
              fullWidth
              multiline
              rows={10}
              className={classes.input}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
              disabled={
                to.length > 0 && subject.length > 0 && message.length > 0
                  ? false
                  : true
              }
            >
              Send
            </Button>
          </form>
        </Paper>
        <Paper className={classes.checkbox}>
          <div>
            <Typography gutterBottom variant="h5">
              <PeopleIcon
                fontSize="large"
                className={classes.titleIcon}
                color="primary"
              />
              Participants
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    to != null && to.length < clients.length ? false : true
                  }
                  onChange={handleCheckAll}
                  label="Select All"
                />
              }
              label="Select All"
            />
            <Divider />
          </div>
          <Scrollbars
            style={{
              width: "100%",
              height: "100%",
              maxHeight: 350
            }}
          >
            {clientsCheckBox}
          </Scrollbars>
        </Paper>
      </Container>
      {/* <SnackbarComponent state={open} /> */}
    </div>
  );
};

SendMailForm.propTypes = {
  clients: PropTypes.array,
  sendEmail: PropTypes.func,
  isNewMessage: PropTypes.bool
};

const mapStateToPros = state => ({
  clients: state.clients.clients,
  isNewMessage: state.messages.isNewMessage
});

export default connect(mapStateToPros, { sendEmail })(SendMailForm);
