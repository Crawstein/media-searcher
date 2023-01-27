import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {importMovies} from "../../../../redux/movies/movies.actions";
import {Icon} from "@iconify/react";


export default function AddFile(props) {
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState({type: null})


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0])
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(importMovies(selectedFile))

        setTimeout(function () {
            handleClose()
        }, 500)
    }

    function handleClose() {
        props.setShowAddFile(prevState => !prevState)
    }

    return (
        <div className="add-file overlay" onSubmit={handleSubmit}>
            <form action="" className="form">
                <div className="form__close" onClick={handleClose}><Icon icon="eva:close-circle-fill"/></div>
                <div className="form__title">Add .txt file</div>
                <input required onChange={changeHandler} type="file" className="file-input"/>
                <button className="submit">Submit</button>
            </form>
        </div>
    )
}