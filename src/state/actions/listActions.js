export const CREATE_LIST = "CREATE_LIST";
export function createList(list) {
  return {
    type: CREATE_LIST,
    payload: {
      list
    }
  };
}

export const SELECT_LIST = "SELECT_LIST";
export function selectList(id) {
  return {
    type: SELECT_LIST,
    payload: {
      id
    }
  };
}

export const CREATE_LIST_ITEM = "CREATE_LIST_ITEM";
export function createListItem(item) {
  return {
    type: CREATE_LIST_ITEM,
    payload: {
      item
    }
  };
}
