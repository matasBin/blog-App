import React, {useRef, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import CreatePostForm from "../components/CreatePostForm";
import CreatePostFormAI from "../components/CreatePostFormAI";

const CreatePostPage = () => {

    const [withAi, setWithAi] = useState(false)

    function switchToAi() {
        setWithAi(!withAi)
    }

    return (
        <div className={"CreatePostPage"}>

            {
                withAi ?
                    <div className="withAi">
                        <CreatePostFormAI/>
                    </div>
                    :
                    <div className="normal">
                        <CreatePostForm/>
                    </div>
            }



        <ToastContainer/>
            <button className={"createPostWithAi"} onClick={switchToAi}>Create Post with AI</button>
        </div>
    );
};

export default CreatePostPage;