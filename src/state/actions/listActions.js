export const CREATE_LIST = "CREATE_LIST";
export function createList(list) {
  return {
    type: CREATE_LIST,
    payload: {
      list
    }
  };
}
