import React, {useRef, useState} from 'react';
import {toast} from "react-toastify";

const CreatePostFormAi = () => {

    const [isLoading, setIsLoading] = useState(false)

    const promptArray = [
        {
            title: "Romantic",
            prompt: "Create a romantic title and description for a blog post about the topic: [TOPIC] with image: [IMAGE]. Respond ONLY with a JSON object in this format: {\"title\": \"Your title\", \"description\": \"Your description\"}. No code blocks, no explanations, just the JSON."
        },
        {
            title: "Fun",
            prompt: "Create a fun title and description for a blog post about the topic: [TOPIC] with image: [IMAGE]. Respond ONLY with a JSON object in this format: {\"title\": \"Your title\", \"description\": \"Your description\"}. No code blocks, no explanations, just the JSON."
        },
        {
            title: "Serious",
            prompt: "Create a serious title and description for a blog post about the topic: [TOPIC] with image: [IMAGE]. Respond ONLY with a JSON object in this format: {\"title\": \"Your title\", \"description\": \"Your description\"}. No code blocks, no explanations, just the JSON."
        },
    ]

    const [selectedPrompt, setSelectedPrompt] = useState()
    const topicInputAi = useRef();
    const ImageInputAi = useRef();


    async function createPostAi() {         /*fetch function to create a post with given topic, image and ai prompt*/
        if(!selectedPrompt) {
            toast.error("Please select AI mood", {
                position: "bottom-right"
            })
            return
        }

        setIsLoading(true)      /*Sets a loader while the request is being processed*/

        const post = {
            topic: topicInputAi.current.value,
            image: ImageInputAi.current.value,
            prompt: selectedPrompt
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(post)
        }
        try {
            const res = await fetch("http://localhost:2500/api/createPostAI", options)
            const data = await res.json()
            console.log(data)
            if(data.success) {
                topicInputAi.current.value = ""
                ImageInputAi.current.value = ""
                toast.success(data.message, {
                    position: "bottom-right"
                })
            } else {
                toast.error(data.message, {
                    position: "bottom-right"
                })
            }
        } catch (e) {
            console.log(e)
        } finally {                     /*Removes the loader once the request is completed*/
            setIsLoading(false)
        }
    }

    function selectPrompt(prompt) {
        setSelectedPrompt(prompt)
        console.log(prompt)
    }

    return (
        <div className={"CreatePostFormAi"}>
            <div className="aiOptions">
                {
                    promptArray.map((item, index) =>
                        <div key={index} className={`aiPrompt ${selectedPrompt === item.prompt ? "selected" : ""}`}
                             onClick={() => selectPrompt(item.prompt)}>
                            <h4>{item.title}</h4>
                        </div>
                    )
                }

            </div>

            <input type="text" placeholder={"Enter Topic"} ref={topicInputAi}/>
            <input type="text" placeholder={"Enter Image URL"} ref={ImageInputAi}/>
            <button onClick={createPostAi} disabled={isLoading}>
                {
                    isLoading ?
                        <span className={"spinner"}>Creating...</span>
                        :
                        "Create post with AI"
                }
            </button>
        </div>
    );
};

export default CreatePostFormAi;