import Menu from "./Menu/Menu";
import Search from "./Search/Search";
import React from "react";

export default function Header(props) {
    return (
        <div className="header">
            <Menu setShowAddMovie={props.setShowAddMovie} setShowAddFile={props.setShowAddFile}/>
            <span className="logo">WebbyLab MoviesDB</span>
            <Search/>
        </div>
    )
}