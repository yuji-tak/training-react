import * as actionTypes from './actions';

const initialState = {
  counter: 0,
  results: []
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.INCREMENT:
      // 元のstateは不変のまま、値をコピー？
      const newState = Object.assign({}, state);
      newState.counter = state.counter;
      // returnがある場合はbreakが不要
      return newState;
    case actionTypes.DECREMENT:
      return {
        // 引数のstateを展開しながら、counterプロパティの値を変更
        ...state,
        counter: state.counter - 1
      }
    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.val
      }
    case actionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.val
      }
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({ id: new Date(),value: state.counter })
      }
    case actionTypes.DELETE_RESULT:
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
