const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'INCREMENT':
      // returnがある場合はbreakが不要
      return {
        counter: state.counter + 1
      }
    case 'DECREMENT':
      return {
        counter: state.counter - 1
      }
    case 'ADD':
      return {
        counter: state.counter + action.val
      }
    case 'SUBTRACT':
      return {
        counter: state.counter - action.val
      }
  }
  // このreturnがある為に、defaultが不要？
  return state;
};

export default reducer;
