import {
  CREATE_LIST,
  SELECT_LIST,
  CREATE_LIST_ITEM
} from "../actions/listActions";

const defaultState = {
  currentList: null,
  rawLists: []
};

export default function lists(prevState = defaultState, action) {
  switch (action.type) {
    case CREATE_LIST:
      return {
        ...prevState,
        rawLists: [...prevState.rawLists, action.payload.list]
      };
    case SELECT_LIST:
      return { ...prevState, currentList: action.payload.id };
    case CREATE_LIST_ITEM:
      const cloneLists = [...prevState.rawLists];
      const listToChange = cloneLists.find(
        list => list.id === prevState.currentList
      );

      listToChange.items.push(action.payload.item);

      return { ...prevState, rawLists: cloneLists };
    default:
      return prevState;
  }
}
