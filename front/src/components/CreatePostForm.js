import React, {useRef, useState} from 'react';
import {toast} from "react-toastify";

const CreatePostForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    const titleInput = useRef();
    const imageInput = useRef();
    const descriptionInput = useRef();

    async function createPost() {
        const post = {
            title: titleInput.current.value,
            image: imageInput.current.value,
            description: descriptionInput.current.value
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(post)
        }
        const res = await fetch("http://localhost:2500/api/createPost", options)
        const data = await res.json()
        console.log(data)
        if(data.success) {
            titleInput.current.value = ""
            imageInput.current.value = ""
            descriptionInput.current.value = ""
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
        <div className={"CreatePostForm"}>
            <input type="text" placeholder={"Enter Title"} ref={titleInput}/>
            <input type="text" placeholder={"Enter Image URL"} ref={imageInput}/>
            <input type="text" placeholder={"Enter Description"} ref={descriptionInput}/>
            <button onClick={createPost} disabled={isLoading}>Create Post</button>
        </div>
    );
};

export default CreatePostForm;