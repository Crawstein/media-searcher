import moviesReducer from "./movies/movies.reducer";
import authorizationReducer from "./authorization/authorization.reducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    moviesReducer: moviesReducer,
    authorizationReducer: authorizationReducer
})

export default rootReducer