import { CREATE_LIST } from "../actions/listActions";

export default function lists(prevState = [], action) {
  switch (action.type) {
    case CREATE_LIST:
      return [...prevState, action.payload.list];
    default:
      return prevState;
  }
}
