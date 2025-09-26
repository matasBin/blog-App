import React, {useRef, useState} from 'react';
import {changeForm} from "../store/allStatesStore";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

    const emailInput = useRef();
    const passwordInput = useRef();
    const passwordInput2 = useRef();

    const setToLogin = changeForm((state) => state.setToLogin)

    const [errorMessage, setErrorMessage] = useState("")

    async function register() {
        const user = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
            password2: passwordInput2.current.value,
        }
        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(user)
        }
        const res = await fetch("http://localhost:2500/api/register", options)
        const data = await res.json()
        console.log(data)
        if(data.success) {
            toast.success(data.message, {
                position: "bottom-right"
            })
        } else {
            setErrorMessage(data.message)
            toast.error(data.message, {
                position: "bottom-right"
            })
        }
    }

    function toLogin() {
        setToLogin(true)
    }

    return (
        <div className={ "Register"}>
            <h5>{errorMessage}</h5>
            <input type="text" placeholder={"Enter Email"} ref={emailInput}/>
            <input type="password" placeholder={"Enter Password"} ref={passwordInput}/>
            <input type="password" placeholder={"Confirm Password"} ref={passwordInput2}/>
            <button onClick={register}>Register</button>
            <button onClick={toLogin}>Already a user? Login</button>
            <ToastContainer/>

        </div>
    );
};

export default Register;