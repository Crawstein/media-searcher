import React, {useEffect, useState} from "react";
import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";
import {searchMovie} from "../../../redux/movies/movies.actions";

export default function Search() {

    const [searchTerm, setSearchTerm] = useState()
    const dispatch = useDispatch()

    function handleChange(e) {
        setSearchTerm(e.target.value)
        dispatch(searchMovie(e.target.value))
    }

    return (
        <div className="search">
            <div className="search__icon"><Icon icon="arcticons:xiaoyuan-search"/></div>
            <input title="Search by title or actors" className="search__input" onChange={handleChange} type="search" placeholder="Search..."
                   value={searchTerm}/>
        </div>
    )
}