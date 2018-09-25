import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ListView from "../ListView";
import "./ListContainer.css";

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

export default class ListContainer extends React.Component {
  state = {
    isShowingItemCreator: false,
    creatorValue: "",
    lists: [
      {
        id: "1",
        items: [
          {
            id: Date().now,
            value: "item 1",
            listId: null
          },
          {
            id: Date().now,
            value: "item 2",
            listId: null
          }
        ]
      }
    ],
    currentList: "1"
  };

  createItem() {
    const cloneLists = [...this.state.lists];
    const currentList = cloneLists.find(
      list => list.id === this.state.currentList
    );

    currentList.items.push({
      id: Date().now,
      value: this.state.creatorValue,
      listId: this.state.currentList
    });

    this.setState({
      items: cloneLists,
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
    const currentList =
      this.state.lists.find(item => item.id === this.state.currentList) || {};

    return (
      <div>
        <ListView items={currentList.items} />
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
      </div>
    );
  }
}
