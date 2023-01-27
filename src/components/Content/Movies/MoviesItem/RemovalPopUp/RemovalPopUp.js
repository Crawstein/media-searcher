import React from "react";
import {removeMovie} from "../../../../../redux/movies/movies.actions";
import {useDispatch} from "react-redux";
import {Icon} from "@iconify/react";

export default function RemovalPopUp(props) {
    const dispatch = useDispatch()
    const removeHandler = (e) => {
        e.preventDefault()
        props.setRemovalPopUp(false)
        dispatch(removeMovie(props.id))
        setTimeout(function () {
            window.location.reload()
        }, 100)
    }

    function handleClose() {
        props.setRemovalPopUp(false)
    }


    return (
        <div className="overlay">
            <form onSubmit={removeHandler} className="form">
                <div className="form__close" onClick={handleClose}><Icon icon="eva:close-circle-fill"/></div>
                <div className="form__subtitle">Are you sure about deleting this movie?</div>
                <div className="form__title">
                    "{props.title}"
                </div>

                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
    )
}