import { SET_ERROR, SET_LOADING, SET_TOKEN } from "./action";

const initialState = {
  isLoading: false,
  token: null,
  error: false,
};

function reducer(state = initialState, { payload, type }) {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

export default reducer;
