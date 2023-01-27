import React from "react";
import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";
import {loadMovies, sortMovie, setOffset} from "../../../redux/movies/movies.actions";

export default function Menu(props) {

    let isSorted = useSelector(store => store.moviesReducer.isSorted)
    let offset = useSelector(store => store.moviesReducer.offset)
    const dispatch = useDispatch()
    const showAmount = useSelector(store => store.moviesReducer.total)
    const pageAmount = Math.ceil(showAmount / 20)


    function handleMovieAddButton() {
        dispatch(setOffset(0))
        offset && dispatch(sortMovie())
        props.setShowAddMovie(prevState => !prevState)
    }

    function handleFileAddButton() {
        dispatch(setOffset(0))
        offset && dispatch(sortMovie())
        props.setShowAddFile(prevState => !prevState)
    }

    function changeSort(e) {
        dispatch(sortMovie())
        const dataObj = {
            offset: offset,
            sort: e.target.value
        }
        dispatch(loadMovies(dataObj))


    }

    let pageOptions = []
    for (let i = 1; i <= pageAmount; i++) {
        pageOptions.push(<option key={i} value={(i - 1) * 20}>Page {i}</option>)
    }

    function changePage(e) {
        dispatch(setOffset(e.target.value))
        const dataObj = {
            offset: e.target.value,
            sort: isSorted
        }
        dispatch(loadMovies(dataObj))
    }

    return (
        <div className="menu">
            <div className="menu__button movie-add" onClick={handleMovieAddButton} title="Add movie"><Icon
                icon="carbon:add-filled"/></div>
            <div className="menu__button file-add" onClick={handleFileAddButton} title="Add from .txt file"><Icon
                icon="ant-design:file-add-filled"/>
            </div>
            <select title="Select sorting method" name="" id="" className='menu__button' value={isSorted}
                    onChange={changeSort}>
                <option value={false}>Sort by default</option>
                <option value={true}>Sort by title</option>
            </select>
            <select title="Select page" name="" id="" className='menu__button' value={offset} onChange={changePage}>
                {pageOptions}
            </select>
        </div>
    )
}