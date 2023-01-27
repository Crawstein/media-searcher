import Movies from "./Movies/Movies";
import AddMovie from "../Header/Menu/AddMovie/AddMovie";
import React from "react";
import AddFile from "../Header/Menu/AddFile/AddFile";

export default function Content(props) {
    return (
        <div className="content">
            <Movies/>
            {props.showAddMovie && <AddMovie setShowAddMovie={props.setShowAddMovie}/>}
            {props.showAddFile && <AddFile setShowAddFile={props.setShowAddFile}/>}
        </div>
    )
}