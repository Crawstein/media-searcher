import React from "react";
import {Icon} from "@iconify/react";


export default function ShowDetails(props) {

    function handleClose() {
        props.setShowDetails(prevState => !prevState)
    }

    return (
        <div className="overlay">
            <div className="form">
                <div className="form__close" onClick={handleClose}><Icon icon="eva:close-circle-fill"/></div>
                <div className="form__title">Details</div>
                <div className="form__box">
                    <label className="label">
                        Title
                    </label>
                    <div className="form__input">{props.title}</div>
                </div>
                <div className="form__box">
                    <label className="label">
                        Release Year
                    </label>
                    <div className="form__input">{props.year}</div>
                </div>
                <div className="form__box">
                    <label className="label">
                        Format
                    </label>
                    <div className="form__input">{props.format}</div>

                </div>


                <div className="form__box">
                    <label className="label">
                        Stars list
                    </label>
                    <div className="form__stars-overflow">
                        {props.actors?.map((data, i) => {
                            return (
                                <div className="stars__box" key={i}>
                                    <div className="form__input">{data.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}