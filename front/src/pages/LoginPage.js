import React from 'react';
import Login from "../components/Login";
import Register from "../components/Register";
import {changeForm} from "../store/allStatesStore";

const LoginPage = () => {

    const toLogin = changeForm((state) => state.toLogin)

    return (
        <div className={ "LoginPage"}>

            {/*Issiaiskint ant galo kaip padaryt piliules formata*/}

            {
                toLogin ?
                    <div className="login">
                        <h4>Login</h4>
                        <Login/>
                    </div>
                    :
                    <div className="register">
                        <h4>Register</h4>
                        <Register/>
                    </div>
            }





        </div>
    );
};

export default LoginPage;