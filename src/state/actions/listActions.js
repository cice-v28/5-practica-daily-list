const PIXABAY_API_KEY = "10246394-d6631a4f04bc86d1f9d0dc42f";

//////////////////////////
//// LISTS

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

//////////////////////////
//// ITEMS

export function createListItem(item) {
  return function(dispatch) {
    dispatch(createListItemInit());

    const url = `https://pixabay.com/api?key=${PIXABAY_API_KEY}&q=${
      item.value
    }`;

    // Para generar error => CATCH
    // const url = `https://pixabay.com/api_______?key=${PIXABAY_API_KEY}&q=${item.value}`;

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setTimeout(
          () =>
            dispatch(
              createListItemSuccess({
                ...item,
                imageUrl: data.hits[0].webformatURL
              })
            ),
          2000
        );
      })
      .catch(err => dispatch(createListItemFail(err.message)));
  };
}

export const CREATE_LIST_ITEM_INIT = "CREATE_LIST_ITEM_INIT";
export function createListItemInit() {
  return {
    type: CREATE_LIST_ITEM_INIT
  };
}

export const CREATE_LIST_ITEM_SUCCESS = "CREATE_LIST_ITEM_SUCCESS";
export function createListItemSuccess(item) {
  return {
    type: CREATE_LIST_ITEM_SUCCESS,
    payload: {
      item
    }
  };
}

export const CREATE_LIST_ITEM_FAIL = "CREATE_LIST_ITEM_FAIL";
export function createListItemFail(error) {
  return {
    type: CREATE_LIST_ITEM_FAIL,
    payload: {
      error
    }
  };
}

export const CREATE_LIST_ITEM_FAIL_CLEAR = "CREATE_LIST_ITEM_FAIL_CLEAR";
export function createListItemFailClear(error) {
  return {
    type: CREATE_LIST_ITEM_FAIL_CLEAR
  };
}
