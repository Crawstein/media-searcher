import MoviesItem from "./MoviesItem/MoviesItem";
import React from "react";
import {useSelector} from "react-redux";

export default function Movies() {
    const moviesData = useSelector(store => store.moviesReducer.movies)
    let moviesItems = moviesData?.map(item => {
        return <MoviesItem key={item.id + 1} {...item} />
    })


    return (
        <div className="movies">
            {moviesItems}
        </div>
    )
}