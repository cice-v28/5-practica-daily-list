import {
  CREATE_LIST,
  SELECT_LIST,
  CREATE_LIST_ITEM_SUCCESS,
  CREATE_LIST_ITEM_INIT,
  CREATE_LIST_ITEM_FAIL,
  CREATE_LIST_ITEM_FAIL_CLEAR
} from "../actions/listActions";

const defaultState = {
  currentList: null,
  rawLists: [],
  isLoading: false,
  error: null
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
    case CREATE_LIST_ITEM_SUCCESS:
      const cloneLists = [...prevState.rawLists];
      const listToChange = cloneLists.find(
        list => list.id === prevState.currentList
      );

      listToChange.items.push(action.payload.item);

      return { ...prevState, rawLists: cloneLists, isLoading: false };
    case CREATE_LIST_ITEM_INIT:
      return { ...prevState, isLoading: true };
    case CREATE_LIST_ITEM_FAIL:
      return { ...prevState, isLoading: false, error: action.payload.error };
    case CREATE_LIST_ITEM_FAIL_CLEAR:
      return { ...prevState, error: null };
    default:
      return prevState;
  }
}
