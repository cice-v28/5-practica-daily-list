import React from "react";
import ItemList from "../ItemList";
import Grid from "@material-ui/core/Grid";
import "./ListView.css";

export default class ListView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="list-content">
          <Grid container spacing={16}>
            {this.props.items &&
              this.props.items.map((item, index) => (
                <Grid item xs={4} key={`grid-item-${index}`}>
                  <ItemList text={item.value} />
                </Grid>
              ))}
          </Grid>
        </section>
      </React.Fragment>
    );
  }
}
