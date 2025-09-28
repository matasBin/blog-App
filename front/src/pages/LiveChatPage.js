import React, {useEffect, useRef, useState} from 'react';
import {socket} from "../socket";
import useLoggedInUser from "../hooks/useLoggedInUser";
import {convertTime} from "../utils/convertTime";

const LiveChatPage = () => {

    const messageInput = useRef();

    const [messages, setMessages] = useState([])

    const loggedInUser = useLoggedInUser()



    function sendMessage() {
        const message = {
            text: messageInput.current.value,
            username: loggedInUser.username,
            date: Date.now()
        }

        socket.emit("liveChat", message)
        messageInput.current.value = ""
    }

    useEffect(() => {
        if(socket.connected) {
            socket.emit("getChatHistory")
        }

        socket.on("liveChat", (data) => {
            if(data.type === "history") {
                setMessages(data.messages || [])
            } else if(data.type === "new") {
                setMessages(prev => [...prev, data.message])
            }
        })

        return () => {
            socket.off("liveChat")
        }
    }, []);

    useEffect(() => {
        console.log(loggedInUser)
    }, []);


    const chatContainerRef = useRef(null)
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={ "LiveChatPage"}>

            <div className="allMessages" ref={chatContainerRef}>
                {
                    messages && messages.length === 0 &&
                    <div className={"message system"}>
                        <div className={"system-content"}>No messages yet. Start the conversation!</div>
                    </div>
                }
                {
                    messages && loggedInUser &&
                    messages.map((item, index) =>
                    <div key={index} className={`message ${item.username === loggedInUser.username ? "user" : "other"}`}>
                        <div className={"message-header"}>
                            <span className={"username"}>{item.username}</span>
                            <span className={"timestamp"}>{convertTime(item.date)}</span>
                        </div>
                        <div className={"message-text"}>{item.text}</div>
                    </div>
                    )
                }
            </div>
            <div className="chatInput">
                <input type="text" placeholder={"Enter Message"} ref={messageInput}/>
                <button onClick={sendMessage}>Send</button>
            </div>


        </div>
    );
};

export default LiveChatPage;