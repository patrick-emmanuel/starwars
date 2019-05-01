import { actions } from "./actions";

export const characterReducer = (state, action) => {
  switch (action.type) {
    case actions.ALL_CHARACTERS:
      return { ...state, allCharacters: action.payload, loading: false };
    case actions.CHARACTERS:
      return { ...state, characters: action.payload, loading: false };
    case actions.SORT_ASC:
      return { ...state, sortAscending: !state.sortAscending };
    case actions.CHARACTERS_LOADING:
      return { ...state, charactersLoading: action.payload };
    case actions.CHARACTERS_ERROR:
      return { ...state, charactersError: action.payload };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};
