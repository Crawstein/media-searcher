import {movieService} from "./movies.services";

export const sortMovie = () => ({
    type: 'SORT'
});

export const setOffset = (data) => ({
    type: 'SET_OFFSET',
    payload: data
})

export function loadMovies(data) {

    return dispatch => {
        movieService.loadMovies(data)
            .then(
                data => {
                    dispatch(request(data))
                }
            );

    };

    function request(data) {
        return {type: "LOAD_MOVIES", payload: data}
    }
}

export function addMovie(data) {

    return dispatch => {
        movieService.addMovie(data)
            .then(
                data => {
                    dispatch(request(data))
                }
            );
    };

    function request(data) {
        return {type: "ADD_MOVIE", payload: data}
    }
}

export function removeMovie(data) {

    return dispatch => {
        movieService.removeMovie(data)
            .then(
                data => {
                    dispatch(request(data))
                }
            );
    };

    function request(data) {
        return {type: "ADD_MOVIE", payload: data}
    }
}

export function getActors(data) {

    return dispatch => {
        movieService.getActors(data)
            .then(
                data => {
                    dispatch(request(data))
                }
            );
    };

    function request(data) {
        return {type: "GET_ACTORS", payload: data}
    }
}

export function searchMovie(data) {

    return dispatch => {
        movieService.searchMovie(data)
            .then(
                data => {
                    dispatch(request(data))
                }
            );
    };

    function request(data) {
        return {type: "SEARCH_MOVIE", payload: data}
    }
}

export function importMovies(data) {

    return dispatch => {
        movieService.importMovies(data)
            .then(
                data => {
                    dispatch(request(data))
                }
            );
    };

    function request(data) {
        return {type: "IMPORT_MOVIES", payload: data}
    }
}