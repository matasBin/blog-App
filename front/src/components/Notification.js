import React, {useEffect, useState} from 'react';
import {socket} from "../socket";
import {currentUser} from "../store/allStatesStore";
import {toast} from "react-toastify";

const Notification = () => {

    const isLoggedIn = currentUser((state) => state.isLoggedIn)


    const [notification, setNotification] = useState([]);
    useEffect(() => {
        socket.on("notification", (data) => {
            console.log(data)
            if(data) {
                toast.success(data.message, {
                    position: "bottom-right"
                })
            }
            setNotification(prev => [...prev, notification])
        })
    }, []);

    function clearNotification() {
        setNotification([])
    }

    return (
        <div className={ "Notification"}>
            {
                isLoggedIn &&
                <div className="notifications">
                    {
                        notification.length !== 0 &&
                        <>
                            <p>{notification.length}</p>
                            <button onClick={clearNotification}>❌</button>
                        </>
                    }
                </div>
            }

        </div>
    );
};

export default Notification;


