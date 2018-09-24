import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class ItemList extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary">{this.props.text || ""}</Typography>
        </CardContent>
      </Card>
    );
  }
}
