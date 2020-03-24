import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  makeStyles,
  Button,
  CssBaseline
} from "@material-ui/core";
import Typography from "../components/Typography";
import axios from "axios";
import Snackbar from "../components/Snackbar";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: ""
  });
  const [open, setOpen] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
      setError(null);
    }, 3000);
  }, [error, open]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post(`https://rfit-platform.herokuapp.com/api/contact`, formData)
      .then(
        res => {
          setFormData({
            name: "",
            company: "",
            email: "",
            message: ""
          });
        },
        err => {
          const { errors } = err.response.data;
          setError(errors[0].msg);
        }
      );

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const { name, company, email, message } = formData;
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          className={classes.title}
          variant="h2"
          marked="center"
          align="center"
          component="h2"
        >
          Contact Us
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={e => onChange(e)}
            value={name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="company"
            label="Company"
            type="text"
            id="company"
            autoComplete="company"
            onChange={e => onChange(e)}
            value={company}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="text"
            id="email-contact"
            autoComplete="email"
            onChange={e => onChange(e)}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="message"
            label="Message"
            type="text"
            id="message"
            multiline
            rows="4"
            autoComplete="message"
            onChange={e => onChange(e)}
            value={message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
        <Snackbar
          open={open}
          onClose={handleClose}
          message={error ? error : "Thanks for contacting us!"}
          type={error ? "error" : "success"}
        />
      </div>
    </Container>
  );
};
