export default store => next => action => {
  console.log('Here is my', action);
  return typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);
};