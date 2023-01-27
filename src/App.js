import './App.css';
import { useState } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const API_URL = 'http://www.omdbapi.com?apikey=e1fe49cc'

function App() {
    const [movies, setMovies] = useState()
    const [search, setSearch] = useState('')
    const [isNewVisit, setIsNewVisit] = useState(true)
    const searchMovies = async (title) => {
        if (title.length === 0) {
            toast.warn(`Type something!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setIsNewVisit(false)
        setMovies(data.Search)
    }

    return (
        <div className="app">
            <ToastContainer />
            <h1>Media Searcher</h1>

            <div className="search">
                <input type="text" placeholder='Search for movies, series or videogames' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={(e) => e.keyCode === 13 ? searchMovies(search) : null} />
                <img src={SearchIcon} alt="Search" onClick={() => searchMovies(search)} />
            </div>




            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie, index) => (
                                <MovieCard movie={movie} key={index + 1} />
                            ))}
                        </div>
                    ) : (

                        !isNewVisit &&
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )


            }

        </div>
    );
}

export default App;
