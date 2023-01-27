import {toast} from "react-toastify";

export const movieService = {
    loadMovies,
    addMovie,
    removeMovie,
    getActors,
    searchMovie,
    importMovies
};

function loadMovies(data) {
    let offset, sort
    ('offset' in data) ? offset = data.offset : offset = 0;
    (data.sort === true || data.sort === 'true') ? sort = '&sort=title' : sort = ''
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': JSON.parse(localStorage.getItem('user')).token},
    };
    return fetch(`http://localhost:8000/api/v1/movies?offset=${offset}${sort}`, requestOptions)
        .then(handleResponse)
        .then(movies => {
            return movies;
        });
}

function addMovie(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('user')).token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(`http://localhost:8000/api/v1/movies`, requestOptions)
        .then(handleResponse)
        .then(movies => {
            if (movies.status === 1) {
                toast.success('The movie was added successfully!')
            } else {
                let errorMessage = `Error status: ${movies.status}, Error message: ${JSON.stringify(movies.error.fields)}`
                toast.error(errorMessage)
            }
            return movies.data;
        })
}

function removeMovie(data) {
    const requestOptions = {
        method: 'delete',
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('user')).token,
            'Content-Type': 'application/json'
        }
    };

    return fetch(`http://localhost:8000/api/v1/movies/${data}`, requestOptions)
        .then(handleResponse)
        .then(movies => {
            return movies.data;
        });
}

function getActors(data) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('user')).token,
            'Content-Type': 'application/json'
        }
    };

    return fetch(`http://localhost:8000/api/v1/movies/${data}`, requestOptions)
        .then(handleResponse)
        .then(movies => {
            return movies.data;
        });
}

function searchMovie(data) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('user')).token,
            'Content-Type': 'application/json'
        }
    };
    let link, request
    request = data.split(', ');
    let isTrue = data.trim().length === 0;

    if (isTrue) {
        link = 'http://localhost:8000/api/v1/movies'
    } else if (request.length === 2) {
        link = 'http://localhost:8000/api/v1/movies?title=' + request[0] + '&actor=' + request[1]
    } else {
        link = 'http://localhost:8000/api/v1/movies?search=' + data
    }
    return fetch(link, requestOptions)
        .then(handleResponse)
        .then(movies => {
            return movies.data;
        });
}

function importMovies(data) {
    const formData = new FormData()
    formData.append('movies', data)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('user')).token
        },
        body: formData
    };
    return fetch(`http://localhost:8000/api/v1/movies/import`, requestOptions)
        .then(handleResponse)
        .then(movies => {
            if (movies.status === 1) {
                let infoMessage = `Imported successfully! Total amount of added/updated: ${movies.meta.imported}`
                toast.success(infoMessage)
                return movies.data;
            } else {
                let errorMessage = `Uploaded file is incorrect! Error message: ${JSON.stringify(movies.error)}`
                toast.error(errorMessage)
                return movies.data;
            }
        })
        .then(test)
        .then(() => {
            const refreshState = {
                offset: 0,
                sort: false
            }
            loadMovies(refreshState)
        });
}

function test() {
    console.log('hoo')
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}