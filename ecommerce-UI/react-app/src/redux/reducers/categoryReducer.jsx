import {
  CATEGORIES_GET_ALL,
  CATEGORY_CLEAR_STATE,
  CATEGORY_INSERT,
  CATEGORY_SET,
  CATEGORY_UPDATE,
} from "../actions/actionType";

const initialState = {
  category: {},
  categories: [],
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_INSERT:
      return { ...state, category: payload };
    case CATEGORIES_GET_ALL:
      return { ...state, categories: payload };
    case CATEGORY_CLEAR_STATE:
      return { ...state, category: {}, categories: [] };
    case CATEGORY_SET:
      return { ...state, category: payload };
    case CATEGORY_UPDATE:
      return { ...state,category: {}, categories: []  };
    default:
      return state;
  }
};
export default categoryReducer;
