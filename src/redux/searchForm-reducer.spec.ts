import searchFormReducer from "./searchForm-reducer";

let initialState = {
  searchTerm: "",
};

describe("searchFormReducer", () => {
  describe("given SET_SEARCH_TERM action", () => {
    const action = { type: "SET_SEARCH_TERM", searchTerm: "ab" };

    it("set lower case letters", () => {
      const state = searchFormReducer(initialState, action);
      expect(state.searchTerm).toEqual("ab");
      expect.stringContaining(state.searchTerm);
      expect(state).toEqual(searchFormReducer(state, action));
    });
  });
});

describe("searchFormReducer Upper case", () => {
  describe("given SET_SEARCH_TERM action", () => {
    const action = { type: "SET_SEARCH_TERM", searchTerm: "AB" };

    it("set upper case letters", () => {
      const state = searchFormReducer(initialState, action);
      expect(state.searchTerm).toEqual("ab");
      expect.stringMatching(state.searchTerm);
      expect(state).toEqual(searchFormReducer(state, action));
    });
    it("has length", () => {
      const state = searchFormReducer(initialState, action);
      expect(state.searchTerm).toHaveLength(2);
    });
  });
});
