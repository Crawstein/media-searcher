import moviesData from "./movies.initialState";

const moviesReducer = (state = moviesData, action) => {
    switch (action.type) {
        case 'SORT':
            return {
                ...state,
                isSorted: !state.isSorted
            }
            break
        case 'ADD_FILE':
            return {
                ...state,
                movies: [...state.movies, ...action.payload]
            }
            break
        case 'LOAD_MOVIES':
            return {
                ...state,
                movies: action.payload.data,
                total: action.payload.meta.total
            }
            break
        case 'ADD_MOVIE':
            return state
            break
        case 'REMOVE_MOVIE':
            return state
            break
        case 'GET_ACTORS':
            return {
                ...state,
                actors: action.payload
            }
            break
        case 'SEARCH_MOVIE':
            return {
                ...state,
                movies: action.payload
            }
            break
        case 'IMPORT_MOVIES':
            return state
            break
        case 'SET_OFFSET':
            return {
                ...state,
                offset: action.payload
            }
        default:
            return state
            break
    }
}

export default moviesReducer