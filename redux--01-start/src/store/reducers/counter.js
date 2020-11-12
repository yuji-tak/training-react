import * as actionTypes from '../actions';

const initialState = {
  counter: 0
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
  }
  // このreturnがある為に、defaultが不要？
  return state;
};

export default reducer;
