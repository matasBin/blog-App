import React from 'react';
import {currentUser} from "../store/allStatesStore";
import {useNavigate} from "react-router-dom";
import {socket} from "../socket";

const LogoutButton = () => {
    const navigate = useNavigate()
    const setLoggedInUser = currentUser((state) => state.setCurrentUser);
    const setIsLoggedIn = currentUser((state) => state.setIsLoggedIn)
    const loggedInUser = currentUser((state) => state.currentUser)

    function handleLogout() {
        socket.disconnect()
        setLoggedInUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem("token")
        navigate("/login")


    }


    return (
        <div className={"LogoutButton"}>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutButton;