import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {socket} from "../socket";
import Notification from "./Notification"
import {currentUser} from "../store/allStatesStore";
import LogoutButton from "./LogoutButton";

const NavBar = () => {

    const loggedInUser = currentUser((state) => state.currentUser)

    useEffect(() => {
        socket.on("poke", (data) => {
            console.log(data)

        })
    }, []);

    return (
        <div className={ "NavBar"}>

            <Link to={"/"}>Home Page</Link>
            <Link to={"/login"}>Login / Register</Link>
            {
                loggedInUser &&
                <>
                    <Link to={"/liveChat"}>Live Chat</Link>
                    <Link to={"/profile"}>My Profile</Link>
                    <Link to={"/createPost"}>Create Post</Link>
                    <Notification/>
                    <div className="loggedInAs">
                        <h4>{loggedInUser.username}</h4>
                        <LogoutButton/>
                    </div>
                </>
            }

        </div>
    );
};

export default NavBar;