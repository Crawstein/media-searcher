import React, {useState} from "react";
import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";
import {addMovie, loadMovies, setOffset, sortMovie} from "../../../../redux/movies/movies.actions";
import {Formik, Field, Form} from 'formik';
import {toast} from "react-toastify";

export default function AddMovie(props) {

    const [starsInputList, setStarsInputList] = useState([{firstName: "", lastName: ""}]);
    let starsInputListConverted = starsInputList.map(item => {
        item = `${item.firstName} ${item.lastName}`
        return item
    })
    const [formData, setFormData] = useState({
        title: "",
        year: 0,
        format: "",
        actors: starsInputListConverted,
    });

    function capitalize(text) {
        return text.replace(/\b\w/g, function (m) {
            return m.toUpperCase();
        });
    }

    function handleFormChange(e) {
        let {name, value, maxLength} = e.target;
        if (name === "title") {
            value = capitalize(value);
        }
        if (maxLength >= 0) {
            value = value.slice(0, maxLength);
        }
        if (name === 'year') {
            value = parseInt(value)
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleStarsInputChange = (e, index) => {
        let {name, value} = e.target;
        const list = [...starsInputList];
        value = value.charAt(0).toUpperCase() + value.slice(1);
        value = value.replace(/[^A-Za-z]/gi, "");
        list[index][name] = value;
        setStarsInputList(list);
        starsInputListConverted = list.map(item => {
            item = `${item.firstName} ${item.lastName}`
            return item
        })
        setFormData((prevState) => ({
            ...prevState,
            actors: starsInputListConverted,
        }));
    };

    const handleRemoveClick = (e, index) => {
        const list = [...starsInputList];
        list.splice(index, 1);
        setStarsInputList(list);
        setFormData((prevState) => ({
            ...prevState,
            actors: list,
        }));
        setTimeout(function () {
            if (document.querySelector('.form__stars-overflow').offsetHeight < 300) {
                document.querySelector('.form__stars-overflow').classList.remove('active')
            }
        })
    };

    const handleAddClick = (e) => {
        setStarsInputList([...starsInputList, {firstName: "", lastName: ""}]);
        setFormData((prevState) => ({
            ...prevState,
            actors: [...starsInputList, {firstName: "", lastName: ""}],
        }));
        setTimeout(function () {
            if (document.querySelector('.form__stars-overflow').offsetHeight >= 300) {
                document.querySelector('.form__stars-overflow').classList.add('active')
            }
        })
    };

    function handleClose() {
        props.setShowAddMovie(prevState => !prevState)
    }


    let offset = useSelector(store => store.moviesReducer.offset)
    const dispatch = useDispatch()

    return (
        <div className="add-movie overlay">
            <Formik
                initialValues={{
                    title: "",
                    year: 0,
                    format: "",
                    actors: starsInputList,
                }}
                onSubmit={async (values) => {
                    if (formData.title.trim() === "") {
                        toast.error('Title field cannot be empty!')
                        setFormData((prevData) => ({
                            ...prevData,
                            title: '',
                        }))
                        return
                    }
                    dispatch(addMovie(formData))
                    dispatch(loadMovies([{}]))
                    dispatch(setOffset(0))
                    offset && dispatch(sortMovie())
                    handleClose()
                }}
            >
                <Form action="" className="form">
                    <div className="form__close" onClick={handleClose}><Icon icon="eva:close-circle-fill"/></div>
                    <div className="form__title">Add movie</div>
                    <div className="form__box">
                        <label className="label" htmlFor="title">
                            Title
                        </label>
                        <Field id="title" required className="form__input" name="title" type="text"
                               onChange={handleFormChange}
                               value={formData.title} placeholder="Enter Movie's Title"/>
                    </div>
                    <div className="form__box">
                        <label className="label" htmlFor="year">
                            Release Year
                        </label>
                        <Field id="year" required className="form__input" name="year" type="number"
                               maxLength={4} min={1900} max={new Date().getFullYear()}
                               onChange={handleFormChange} value={formData.year}
                               placeholder="Enter Release Year"/>
                    </div>
                    <div className="form__box">
                        <label className="label" htmlFor="format">
                            Format
                        </label>
                        <select id="format" required name="format" onChange={handleFormChange} className="form__input">
                            <option value="">Select Format</option>
                            <option value="VHS">VHS</option>
                            <option value="DVD">DVD</option>
                            <option value="Blu-Ray">Blu-Ray</option>
                        </select>
                    </div>

                    <div className="form__box">
                        <label className="label" htmlFor="">
                            Stars list
                        </label>
                        <div className="form__stars-overflow">
                            {starsInputList.map((data, i) => {
                                return (
                                    <div className="stars__box" key={i}>
                                        <Field className="form__input" required name="firstName"
                                               placeholder="Enter First Name"
                                               value={data.firstName} onChange={(e) => handleStarsInputChange(e, i)}/>
                                        <Field className="form__input" required name="lastName"
                                               placeholder="Enter Last Name"
                                               value={data.lastName} onChange={(e) => handleStarsInputChange(e, i)}/>
                                        <div className="form__button-box">
                                            {starsInputList.length !== 1 && (
                                                <button className="mr10" onClick={() => handleRemoveClick(i)}
                                                        title="Remove this star">
                                                    Remove
                                                </button>
                                            )}
                                            {starsInputList.length - 1 === i && (
                                                <button onClick={handleAddClick} title="Add new star">
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button className="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
