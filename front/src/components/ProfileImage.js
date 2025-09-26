import React, {useRef, useState} from 'react';
import {currentUser} from "../store/allStatesStore";
import useLoggedInUser from "../hooks/useLoggedInUser";
import {toast} from "react-toastify";

const ProfileImage = () => {

    const loggedInUser = useLoggedInUser()
    const setLoggedInUser = currentUser((state) => state.setCurrentUser);

    const [isEditingImage, setIsEditingImage] = useState(false)
    const imageInput = useRef()

    function toggleImageEdit() {
        setIsEditingImage(!isEditingImage)
    }

    async function editProfileImg() {
        const user = {
                image: imageInput.current.value
            },
            options = {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify(user)
            }
        const res = await fetch(`http://localhost:2500/api/editProfileImg/${loggedInUser._id}`, options)
        const data = await res.json()
        console.log(data)
        if (data.success) {
            setLoggedInUser(data.user)
            setIsEditingImage(false)
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
        <div className={ "ProfileImage"}>
            {
                loggedInUser &&
                <div className="imageContainer">
                    <img src={loggedInUser.image} alt=""/>
                    <button onClick={toggleImageEdit} className={"editBtn"}>
                        <img src={`https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-92-512.png`} alt="Edit"/>
                    </button>
                    {
                        isEditingImage &&
                        <div className={"modalOverlay"}>
                            <div className="modal">
                                <h3>Edit Profile Image</h3>
                                <input type="text" placeholder={"Enter Image URL"} ref={imageInput} defaultValue={loggedInUser.image}/>
                                <div className="modalButtons">
                                    <button onClick={toggleImageEdit} className={"cancelBtn"}>Cancel</button>
                                    <button onClick={editProfileImg} className={"saveBtn"}>Save</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }

        </div>
    );
};

export default ProfileImage;