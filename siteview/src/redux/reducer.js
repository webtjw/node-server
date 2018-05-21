const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return Object.assign({}, state, {developer: action.data});
    default:
      return state;
  }
}

export default reducer;