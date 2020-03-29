import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "moment-timezone";
import MaterialTable from "material-table";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 400
  },
  chip: {
    margin: "0 2px 2px 0"
  }
});

const AllMessagesTable = ({ emails }) => {
  const columns = [
    { title: "Date", field: "date", type: "date", filtering: true },
    {
      title: "Client",
      field: "participants",
      type: "string",
      render: rowData =>
        rowData.participants.map(client => {
          return (
            <Chip
              size="small"
              label={`${client.firstName} ${client.lastName} `}
              className={classes.chip}
            />
          );
        }),
      filtering: false
    },
    { title: "Subject", field: "subject", type: "string", filtering: false },
    { title: "Message", field: "message", type: "string", filtering: false }
  ];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Messages Center"
        className={classes.table}
        columns={columns}
        data={emails}
        options={{ pageSize: 10, filtering: true, draggable: false }}
        onRowClick={(event, rowData) => {}}
      />
    </div>
  );
};

AllMessagesTable.propTypes = {
  emails: PropTypes.array
};

const mapStateToPros = state => ({
  emails: state.messages.emails
});

export default connect(mapStateToPros, {})(AllMessagesTable);
