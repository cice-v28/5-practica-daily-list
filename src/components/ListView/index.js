import React from "react";
import ItemList from "../ItemList";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "./ListView.css";

export default class ListView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="list-content">
          <header>
            <Typography variant="display1">{this.props.listName}</Typography>
          </header>
          <Grid container spacing={16}>
            {this.props.items &&
              this.props.items.map((item, index) => (
                <Grid item xs={4} key={`grid-item-${index}`}>
                  <ItemList text={item.value} image={item.imageUrl} />
                </Grid>
              ))}
          </Grid>
        </section>
      </React.Fragment>
    );
  }
}
