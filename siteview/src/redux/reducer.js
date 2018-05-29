const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return Object.assign({user: action.data}, state);
    default:
      return state;
  }
}

export default reducer;