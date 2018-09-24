import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ItemList from "../ItemList";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import "./ListView.css";

const ItemCreator = ({ creatorValue, changeItemValue, onCreateItem }) => (
  <Paper elevation={1}>
    <Typography variant="headline" component="h3">
      Nuevo elemento de Lista.
    </Typography>
    <div>
      <form>
        <TextField
          id="standard-name"
          label="Elemento"
          value={creatorValue}
          style={{ width: "80%" }}
          onChange={e => changeItemValue(e.target.value)}
          margin="normal"
        />
        <Button color="primary" onClick={onCreateItem}>
          Crear
        </Button>
      </form>
    </div>
  </Paper>
);

export default class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingItemCreator: false,
      creatorValue: "",
      items: this.props.data.items
    };
  }
  state = {};

  createItem() {
    this.setState({
      items: [
        ...this.state.items,
        {
          id: Date().now,
          value: this.state.creatorValue,
          listId: null
        }
      ],
      creatorValue: "",
      isShowingItemCreator: false
    });
  }

  chageItemValue(value) {
    this.setState({
      creatorValue: value
    });
  }

  showItemCreator() {
    this.setState({
      isShowingItemCreator: true
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="list-content">
          <Grid container spacing={12}>
            {this.state.items &&
              this.state.items.map(item => (
                <Grid item xs={4}>
                  <ItemList text={item.value} />
                </Grid>
              ))}
          </Grid>
        </section>
        <Button
          variant="fab"
          className="fab-button"
          color="secondary"
          onClick={() => this.showItemCreator()}
        >
          <AddIcon />
        </Button>
        {this.state.isShowingItemCreator && (
          <div className="custom-paper">
            <ItemCreator
              creatorValue={this.state.creatorValue}
              changeItemValue={value => this.chageItemValue(value)}
              onCreateItem={() => this.createItem()}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}
