import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ListView from "../ListView";
import { connect } from "react-redux";
import { createListItem } from "../../state/actions/listActions";
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

class ListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingItemCreator: false,
      creatorValue: ""
    };
  }

  createItem() {
    this.props.createListItem({
      id: Date().now,
      value: this.state.creatorValue,
      listId: this.state.currentList
    });

    this.setState({
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
      this.props.lists.find(list => list.id === this.props.currentList) || {};

    return (
      <div>
        <ListView listName={currentList.name} items={currentList.items} />
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

const mapStateToProps = state => ({
  lists: state.lists.rawLists,
  currentList: state.lists.currentList
});

const mapDispatchToProps = {
  createListItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
