import languageReducer from './language-reducer';

let initialState = {
    activeLanguage: 'en',
}

describe("languageReducer", () => {
  describe("given SET_ACTIVE_LANGUAGE action", () => {
    const action = {type: 'SET_ACTIVE_LANGUAGE', activeLanguage: 'ru'};

    it('changes language', () => {
      const state = languageReducer(initialState, action);
      expect(state.activeLanguage).toEqual('ru');
      expect(state).toEqual(languageReducer(state, action));
    });
    it('set same language again', () => {
        const state = languageReducer(initialState, action);
        expect(state.activeLanguage).not.toEqual('en');
        expect(state).toEqual(languageReducer(state, action));
      });
  })
}) 