
const ACTION_CONST = {
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
}

let initialState = {
    searchTerm: '',
}

const searchFormReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTION_CONST.SET_SEARCH_TERM: {
            return { ...state, searchTerm: action.searchTerm.toLowerCase() }
        }
        default:
            return state;
    }
}

export const setSearchFormTerm = (searchTerm: string) => ({ type: ACTION_CONST.SET_SEARCH_TERM, searchTerm });

export default searchFormReducer;
