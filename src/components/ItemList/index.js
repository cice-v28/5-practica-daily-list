import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

export default class ItemList extends React.Component {
  render() {
    console.log("ITEM_C", this.props);
    return (
      <Card>
        <CardActionArea>
          <CardMedia
            image={this.props.image}
            title={this.props.text}
            component="img"
          />
          <CardContent>
            <Typography color="textSecondary">
              {this.props.text || ""}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
