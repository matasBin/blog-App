import React, {useState} from 'react';
import {ToastContainer} from "react-toastify";
import CreatePostForm from "../components/CreatePostForm";
import CreatePostFormAI from "../components/CreatePostFormAI";

const CreatePostPage = () => {

    const [withAi, setWithAi] = useState(false)

    /*Function to switch between manual and AI creation of posts*/
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
            {
                withAi ?
                    <button className={"createPostWithAi"} onClick={switchToAi}>Create Post Manually</button>
                    :
                    <button className={"createPostWithAi"} onClick={switchToAi}>Create Post with AI</button>
            }

        </div>
    );
};

export default CreatePostPage;