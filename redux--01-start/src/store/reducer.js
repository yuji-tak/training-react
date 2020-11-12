import { Provider } from "react-redux";

const initialState = {
  counter: 0,
  results: []
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'INCREMENT':
      // 元のstateは不変のまま、値をコピー？
      const newState = Object.assign({}, state);
      newState.counter = state.counter;
      // returnがある場合はbreakが不要
      return newState;
    case 'DECREMENT':
      return {
        // 引数のstateを展開しながら、counterプロパティの値を変更
        ...state,
        counter: state.counter - 1
      }
    case 'ADD':
      return {
        ...state,
        counter: state.counter + action.val
      }
    case 'SUBTRACT':
      return {
        ...state,
        counter: state.counter - action.val
      }
    case 'STORE_RESULT':
      return {
        ...state,
        results: state.results.concat({ id: new Date(),value: state.counter })
      }
    case 'DELETE_RESULT':
      const updatedArray = state.results.filter(result => result.id !== action.resultElementId);
      return {
        ...state,
        results: updatedArray
      }
  }
  // このreturnがある為に、defaultが不要？
  return state;
};

export default reducer;
