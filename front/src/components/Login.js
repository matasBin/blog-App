import React, {useRef, useState} from 'react';
import {changeForm, currentUser} from "../store/allStatesStore";
import {socket} from "../socket";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    const setIsLoggedIn = currentUser((state) => state.setIsLoggedIn)
    const setToLogin = changeForm((state) => state.setToLogin)
    const [errorMessage, setErrorMessage] = useState("")
    const emailInput = useRef();
    const passwordInput = useRef();
    const setLoggedInUser = currentUser((state) => state.setCurrentUser)



    async function login() {        /*Login fetch function, sends email and password to backend*/

        const user = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
        }
        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(user)
        }
        const res = await fetch("http://localhost:2500/api/login", options)
        const data = await res.json()
        console.log(data)
        if(data.success) {
            setIsLoggedIn(true)
            setLoggedInUser(data.user)
            localStorage.setItem("token", data.token)
            socket.emit("authenticate", {
                userId: data.userId,
                username: data.username
            })

            toast.success(data.message, {
                position: "bottom-right"
            })
            setTimeout(() => navigate("/"), 1000)
        } else {
            setErrorMessage(data.message)
            toast.error(data.message, {
                position: "bottom-right"
            })
        }
    }

    function toRegister() {
        setToLogin(false)
    }

    return (
        <div className={"Login"}>
            <h5>{errorMessage}</h5>
            <input type="text" placeholder={"Email"} ref={emailInput}/>
            <input type="password" placeholder={"Password"} ref={passwordInput}/> {/*Pakeist prode type i password*/}
            <button onClick={login}>Login</button>
            <button onClick={toRegister}>Don't have an account? Sign up</button>
            <ToastContainer/>


        </div>
    );
};

export default Login;