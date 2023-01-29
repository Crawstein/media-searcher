import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <a href={`https://google.com/search?q=${movie.Title}, ${movie.Type}`} target="blank" className="movie">
            <div>
                <p>{movie.Year.trim().endsWith('–') ? `${movie.Year}Present` : movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x284'} alt={movie.Title} />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </a>
    )
}

export default MovieCard