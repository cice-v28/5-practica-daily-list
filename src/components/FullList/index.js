import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class FullList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="display3   " color="textPrimary">
          Ya has llenado tu lista
        </Typography>
        <Link to="/app">
          <Button variant="outlined" color="primary">
            Volver a la app
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}
