import React from "react";
import { Button, Typography } from "@material-ui/core";
import "./Landing.css";
import { Link } from "react-router-dom";

export default class Landing extends React.Component {
  render() {
    return (
      <div className="landing-bg">
        <div className="landing-content">
          <Typography variant="display3" className="landing-title">
            Organiza tu lista de la compra
          </Typography>
          <Link to="/app" className="landing-link">
            <Button variant="outlined" color="secondary">
              Acceder a la app
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
