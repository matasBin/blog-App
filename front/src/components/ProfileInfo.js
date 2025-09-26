import React, {useRef, useState} from 'react';
import useLoggedInUser from "../hooks/useLoggedInUser";
import {currentUser, posts} from "../store/allStatesStore";
import {convertDate} from "../utils/convertDate";
import {toast, ToastContainer} from "react-toastify";

const ProfileInfo = () => {

    const postsArray = posts((state) => state.postsArray)
    const setPosts = posts((state) => state.setPostsArray)

    const setLoggedInUser = currentUser((state) => state.setCurrentUser);

    const loggedInUser = useLoggedInUser()
    const [isEditingUsername, setIsEditingUsername] = useState(false)
    const usernameInput = useRef()

    const [passwordModal, setPasswordModal] = useState(false)
    const oldPasswordInput = useRef()
    const newPasswordInput = useRef()
    const newPasswordInput2 = useRef()

    function toggleUsernameEdit() {
        setIsEditingUsername(true)
    }

    async function editUsername() {
        const user = {
                username: usernameInput.current.value
            },
            options = {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify(user)
            }
        const res = await fetch(`http://localhost:2500/api/editUsername/${loggedInUser._id}`, options)
        const data = await res.json()
        console.log(data)
        if (data.success) {
            setLoggedInUser(data.user)
            setPosts(data.posts)
            setIsEditingUsername(false)
            toast.success(data.message, {
                position: "bottom-right"
            })
        } else {
            toast.error(data.message, {
                position: "bottom-right"
            })
        }
    }

    function togglePasswordModal() {
        setPasswordModal(!passwordModal)
    }

    async function changePassword() {
        const user = {
            oldPassword: oldPasswordInput.current.value,
            newPassword: newPasswordInput.current.value,
            newPassword2: newPasswordInput2.current.value
        }
        const options = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(user)
        }
        const res = await fetch(`http://localhost:2500/api/editPassword/${loggedInUser._id}`, options)
        const data = await res.json()
        console.log(data)
        if(data.success) {
            setPasswordModal(false)
            toast.success(data.message, {
                position: "bottom-right"
            })
        } else {
            toast.error(data.message, {
                position: "bottom-right"
            })
        }

    }

    return (
        <div className={"ProfileInfo"}>
            {
                loggedInUser &&
                <>
                    <div className="usernameSection">
                        {
                            isEditingUsername ?
                                <div className={"usernameEdit"}>
                                    <input type="text" placeholder={loggedInUser.username} ref={usernameInput} defaultValue={loggedInUser.username}/>
                                    <button onClick={editUsername} className={"saveBtn"}>
                                        <img src={`https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-92-512.png`} alt="Save"/>
                                    </button>
                                </div>
                                :
                                <div className={"usernameDisplay"}>
                                    <h2>{loggedInUser.username}</h2>
                                    <button onClick={toggleUsernameEdit} className={"editBtn"}>
                                        <img src={`https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-92-512.png`} alt="Edit"/>
                                    </button>
                                </div>
                        }
                    </div>
                    <div className="userDetails">
                        <p className={"email"}>Email: {loggedInUser.email}</p>
                        <p className={"createdDate"}>Member since: {convertDate(loggedInUser.date)}</p>
                    </div>
                    <button onClick={togglePasswordModal} className={"changePasswordBtn"}>
                        <img src={`https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-92-512.png`} alt="Change Password"/>
                        Change Password
                    </button>
                    {
                        passwordModal &&
                        <div className={"modalOverlay"}>
                            <div className="modal">
                                <h3>Change Password</h3>
                                <input type="text" placeholder={"Current Password"} ref={oldPasswordInput}/>
                                <input type="text" placeholder={"New Password"} ref={newPasswordInput}/>
                                <input type="text" placeholder={"Confirm New Password"} ref={newPasswordInput2}/>
                                <div className={"modalButtons"}>
                                    <button onClick={togglePasswordModal} className={"cancelBtn"}>Cancel</button>
                                    <button onClick={changePassword} className={"saveBtn"}>Save</button>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }

        <ToastContainer/>
        </div>
    );
};

export default ProfileInfo;