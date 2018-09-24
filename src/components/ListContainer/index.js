import React from "react";
import ListView from "../ListView";

export default class ListContainer extends React.Component {
  state = {
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
  render() {
    return (
      <div>
        <ListView
          data={this.state.lists.find(
            item => item.id === this.state.currentList
          )}
        />
      </div>
    );
  }
}
