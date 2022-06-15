import { searchAPI } from "../api/api";

const SET_SEARCH_DATA = 'GET_SEARCH'

const initialState = {
    cosmetics: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_DATA:
            return { ...state, cosmetics: action.cosmetics }
        default:
            return state
    }
}

const setSearchData = (cosmetics) => ({ type: SET_SEARCH_DATA, cosmetics })

export const getSearch = (name) => (dispatch) => {
    return searchAPI.getSearch(name)
        .then(response => {
            if (response.status === 200) {
                dispatch(setSearchData(response.data))
                return response.data
            }
        })
}

export default searchReducer