import {Icon} from '@iconify/react';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getActors} from "../../../../redux/movies/movies.actions";
import ShowDetails from "./ShowDetails/ShowDetails";
import React, {useState} from "react";
import RemovalPopUp from "./RemovalPopUp/RemovalPopUp";

export default function MoviesItem(props) {
    const dispatch = useDispatch()

    function removeMovieHandler() {
        setRemovalPopUp(true)
    }

    const actors = useSelector(store => store.moviesReducer.actors)

    const [showDetails, setShowDetails] = useState(false)

    const [removalPopUp, setRemovalPopUp] = useState(false)

    function handleDetails() {
        dispatch(getActors(props.id))
        setShowDetails(prevState => !prevState)
    }

    return (
        <div className="movies__item">
            {showDetails && <ShowDetails setShowDetails={setShowDetails} {...actors}/>}
            <div className="movies__item-delete" title="Remove this movie" onClick={removeMovieHandler}><Icon
                icon="eva:close-circle-fill"/></div>
            <div className="movies__item-id">{props.id}</div>
            <div className="movies__item-header">
                <div className="movies__item-title">{props.title}</div>
            </div>

            <button onClick={handleDetails} className="movies__item-details-btn" title="Open Details Window">Show
                Details
            </button>
            {removalPopUp && <RemovalPopUp id={props.id} setRemovalPopUp={setRemovalPopUp} title={props.title}/>}
        </div>
    )
}