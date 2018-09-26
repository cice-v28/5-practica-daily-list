import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListContainer from "../ListContainer";
import { connect } from "react-redux";
import { createList } from "../../state/actions/listActions";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const DialogListCreator = ({
  valueCreator,
  isOpen,
  onHandleClose,
  onCreateList,
  onChangeCreatorText
}) => (
  <Dialog
    open={isOpen}
    onClose={onHandleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Crear nueva lista</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Introduce el nombre de la lista que quieres crear.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="listname"
        label="Nombre de lista"
        type="text"
        value={valueCreator}
        onChange={e => onChangeCreatorText(e.target.value)}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onHandleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onCreateList} color="secondary">
        Crear
      </Button>
    </DialogActions>
  </Dialog>
);

const MasterList = ({ isOpen, onClose, items, onSelectList }) => (
  <Drawer open={isOpen} onClose={onClose}>
    <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
      <List component="nav">
        {items.map(item => (
          <ListItem button onClick={() => onSelectList(item.id)}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  </Drawer>
);

class App extends React.Component {
  state = {
    dialogOpen: false,
    textCreatorList: "",
    lists: [],
    currentList: null,
    isDrawerOpen: false
  };

  handleCloseDialog() {
    this.setState({ dialogOpen: false });
  }

  handleOpenDialog() {
    this.setState({ dialogOpen: true });
  }

  createList() {
    this.setState({
      lists: [
        ...this.state.lists,
        {
          id: `list-${Date.now()}`,
          name: this.state.textCreatorList,
          items: []
        }
      ],
      dialogOpen: false,
      textCreatorList: ""
    });

    this.props.createList({
      id: `list-${Date.now()}`,
      name: this.state.textCreatorList,
      items: []
    });
  }

  createItemList(item) {
    const cloneLists = [...this.state.lists];
    const currentList = cloneLists.find(
      list => list.id === this.state.currentList
    );

    currentList.items.push(item);
  }

  changeCreatorText(value) {
    this.setState({
      textCreatorList: value
    });
  }

  closeMasterList() {
    this.setState({
      isDrawerOpen: false
    });
  }

  openMasterList() {
    this.setState({
      isDrawerOpen: true
    });
  }

  selectList(id) {
    this.setState({
      currentList: id
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <header>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={() => this.openMasterList()}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.grow}
                >
                  Lista de la compra
                </Typography>
                <IconButton
                  aria-label="Crear lista"
                  color="secondary"
                  onClick={() => this.handleOpenDialog()}
                >
                  <PlaylistAdd />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        </header>
        <main>
          <ListContainer
            lists={this.state.lists}
            currentList={this.state.currentList}
            onCreateItemList={item => this.createItemList(item)}
          />
          <DialogListCreator
            valueCreator={this.state.textCreatorList}
            isOpen={this.state.dialogOpen}
            onHandleClose={() => this.handleCloseDialog()}
            onCreateList={() => this.createList()}
            onChangeCreatorText={value => this.changeCreatorText(value)}
          />
          <MasterList
            items={this.props.lists}
            isOpen={this.state.isDrawerOpen}
            onClose={() => this.closeMasterList()}
            onSelectList={id => this.selectList(id)}
          />
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

const mapDispatchToProps = {
  createList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
