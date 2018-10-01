import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ListView from "../ListView";
import { connect } from "react-redux";
import {
  createListItem,
  createListItemFailClear
} from "../../state/actions/listActions";
import "./ListContainer.css";
import { Redirect } from "react-router-dom";

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
      creatorValue: "",
      isFull: false
    };
  }

  createItem() {
    this.props.createListItem({
      id: Date.now(),
      value: this.state.creatorValue,
      listId: this.props.currentList,
      imageUrl: null
    });

    const currentList =
      this.props.lists.find(list => list.id === this.props.currentList) || {};

    this.setState({
      creatorValue: "",
      isShowingItemCreator: false,
      isFull: currentList.items.length >= 3
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

  closeSnack() {
    this.props.createListItemFailClear();
  }

  render() {
    if (this.state.isFull) {
      return <Redirect to="/fulllist" />;
    }

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
        {this.props.isLoading && (
          <div className="loader">
            <CircularProgress />
          </div>
        )}
        {this.props.hasError && (
          <Snackbar
            open={true}
            TransitionComponent={Fade}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.props.hasError}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => this.closeSnack()}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists.rawLists,
  currentList: state.lists.currentList,
  isLoading: state.lists.isLoading,
  hasError: state.lists.error
});

const mapDispatchToProps = {
  createListItem,
  createListItemFailClear
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
