
const ACTION_CONST = {
    SET_ACTIVE_LANGUAGE: 'SET_ACTIVE_LANGUAGE',
}

let initialState = {
    activeLanguage: 'en',
}

const languageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTION_CONST.SET_ACTIVE_LANGUAGE: {
            return { ...state, activeLanguage: action.activeLanguage }
        }
        default:
            return state;
    }
}

export const setActiveLanguage = (activeLanguage: any) => ({ type: ACTION_CONST.SET_ACTIVE_LANGUAGE, activeLanguage });

export default languageReducer;
