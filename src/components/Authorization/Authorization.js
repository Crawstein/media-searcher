import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {signup, signin} from "../../redux/authorization/authorization.actions"


export default function Authorization() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    function capitalize(text) {
        return text.replace(/\b\w/g, function (m) {
            return m.toUpperCase();
        });
    }

    function handleFormChange(e) {
        let {name, value} = e.target;
        if (name === "name") {
            value = capitalize(value);
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (showSignUp) {
            dispatch(signup(formData));
        } else {
            dispatch(signin(formData));
        }
        setTimeout(function () {
            window.location.reload()
        }, 100)
    }

    const [showSignUp, setShowSignUp] = useState(true)

    function handleShowSignUp(e) {
        e.preventDefault()
        setShowSignUp(true)
    }

    function handleShowSignIn(e) {
        e.preventDefault()
        setShowSignUp(false)
    }

    return (
        <div className="authorization overlay">

            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    password: '',
                    confirmPassword: ''
                }}
            >
                <Form className="form" onSubmit={handleSubmit}>
                    <div className="form__toggle">
                        <button className={showSignUp ? 'active' : null} onClick={handleShowSignUp}>Sign Up</button>
                        <button className={!showSignUp ? 'active' : null} onClick={handleShowSignIn}>Sign In</button>
                    </div>
                    <div className="form__box">
                        <label className="label" htmlFor="title">
                            Email
                        </label>
                        <Field id="email" required className="form__input" value={formData.email}
                               onChange={handleFormChange} name="email" type="email" placeholder="Enter your email"/>
                    </div>
                    {showSignUp &&
                    <div className="form__box">
                        <label className="label" htmlFor="title">
                            Name
                        </label>
                        <Field id="name" required className="form__input" value={formData.name}
                               onChange={handleFormChange} name="name" type="text" placeholder="Enter your name"/>
                    </div>
                    }

                    <div className="form__box">
                        <label className="label" htmlFor="title">
                            Password
                        </label>
                        <Field id="password" required className="form__input" value={formData.password}
                               onChange={handleFormChange} name="password" type="password"
                               placeholder="Enter your password"/>
                    </div>
                    {showSignUp &&
                    <div className="form__box">
                        <label className="label" htmlFor="title">
                            Confirm Password
                        </label>
                        <Field id="confirmPassword" required className="form__input" value={formData.confirmPassword}
                               onChange={handleFormChange} name="confirmPassword" type="password"
                               placeholder="Confirm your password"/>
                    </div>
                    }

                    <button className="submit">{showSignUp ? 'Sign Up' : 'Sign In'}</button>
                </Form>
            </Formik>
        </div>
    )
}