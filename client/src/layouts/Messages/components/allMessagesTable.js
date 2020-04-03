import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "moment-timezone";
import MaterialTable from "material-table";
import { Chip } from "@material-ui/core";
import { Link } from "react-router-dom";

import {
  MailOutline as MailOutlineIcon,
  WhatsApp as WhatsAppIcon,
} from "@material-ui/icons/";
const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 400,
  },
  chip: {
    margin: "0 2px 2px 0",
  },
});

const AllMessagesTable = ({ messages }) => {
  const columns = [
    { title: "Date", field: "date", type: "date", filtering: true },
    {
      title: "Client",
      field: "participants",
      type: "string",
      render: (rowData) =>
        rowData.participants.map((client) => {
          return (
            <Link to={"../dashboard/clients/" + client._id}>
              <Chip
                size="small"
                label={`${client.firstName} ${client.lastName} `}
                className={classes.chip}
              />
            </Link>
          );
        }),
      filtering: false,
    },
    {
      title: "Platform",
      field: "type",
      type: "string",
      lookup: { 1: "Email", 2: "WhatsApp" },
      render: (rowData) =>
        rowData.type === 1 ? (
          <MailOutlineIcon color="primary" style={{ fontSize: 30 }} />
        ) : rowData.type === 2 ? (
          <WhatsAppIcon style={{ color: "#00E676", fontSize: 30 }} />
        ) : (
          ""
        ),
    },
    { title: "Subject", field: "subject", type: "string", filtering: false },
    { title: "Message", field: "message", type: "string", filtering: false },
  ];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Messages Center"
        className={classes.table}
        columns={columns}
        data={messages}
        options={{ pageSize: 10, filtering: true, draggable: false }}
        onRowClick={(event, rowData) => {}}
      />
    </div>
  );
};

AllMessagesTable.propTypes = {
  messages: PropTypes.array,
};

const mapStateToPros = (state) => ({
  messages: state.messages.allMessages,
});

export default connect(mapStateToPros, {})(AllMessagesTable);
