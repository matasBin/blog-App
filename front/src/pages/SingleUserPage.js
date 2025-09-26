import React, {useEffect} from 'react';
import {currentUser, users} from "../store/allStatesStore";
import {useParams} from "react-router-dom";
import {socket} from "../socket";
import {convertDate} from "../utils/convertDate";
import {toast, ToastContainer} from "react-toastify";

const SingleUserPage = () => {
    const {username} = useParams()
    const usersArray = users((state) => state.usersArray)
    const setUsersArray = users((state) => state.setUsersArray)
    const selectedUser = usersArray.find(user => user.username === username)

    const loggedInUser = currentUser((state) => state.currentUser)
    const setLoggedInUser = currentUser((state) => state.setCurrentUser);


    useEffect(() => {
        async function getUsers() {
            const res = await fetch("http://localhost:2500/api/allUsers")
            const data = await res.json()
            console.log(data)
            setUsersArray(data)
        }

        getUsers()
    }, [])


    function poke() {
        const pokeInfo = {
            pokerUsername: loggedInUser.username,
            pokedUsername: selectedUser.username,
        }

        socket.emit("poke", pokeInfo)
        toast.success(`You poked ${pokeInfo.pokedUsername}`, {
            position: "bottom-right"
        })
    }

    return (
        <div className={"SingleUserPage"}>
            {
                selectedUser &&
                <div className="userProfileContainer">
                    <div className="userImage">
                        <img src={selectedUser.image} alt="user image"/>
                    </div>
                    <div className="userInfo">
                        <h4>{selectedUser.username}</h4>
                        <p>Member since: {convertDate(selectedUser.date)}</p>
                        {
                            loggedInUser &&
                            <button onClick={poke}>Poke</button>
                        }

                    </div>
                </div>

            }

        <ToastContainer/>
        </div>
    );
};

export default SingleUserPage;