import authReducer, { login } from './auth-reducer';

let initialState = {
  userData: '',
  isAuthorized: true,
}

describe("authReducer logout", () => {
  describe("given SET_DEFAULT_VALUES action", () => {
    const action = {type: 'SET_DEFAULT_VALUES', isAuthorized: false, userData: ''};
    it('state is object', () => {
      const state = authReducer(initialState, action);
      expect.objectContaining(state);
    });
    it('checks initial state', () => {
      expect(initialState.userData).toBe('');
      expect(initialState.isAuthorized).toBe(true);
    });
    it('checks is auth reducer defined', () => {
      expect(authReducer(initialState, action)).toBeDefined();
    });
    it('imitates log out', () => {
      const state = authReducer(initialState, action);
      expect(state.isAuthorized).toBeFalsy();
      expect(state).toEqual(authReducer(state, action));
    });
    it('isAuthorized is not string', () => {
      const state = authReducer(initialState, action);
      expect(state.isAuthorized).toStrictEqual(false);
    });
  })
  
}) 



