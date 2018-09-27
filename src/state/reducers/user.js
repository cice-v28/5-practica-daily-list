import { SET_USER_DATA } from "../actions/userActions";

const defaultState = {
  data: {}
};

export default function user(prevState = defaultState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...prevState, data: action.payload.user };
    default:
      return prevState;
  }
}
