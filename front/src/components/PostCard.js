import React from 'react';
import {Link} from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";
import {currentUser, posts} from "../store/allStatesStore";
import {toast, ToastContainer} from "react-toastify";

const PostCard = ({item, index}) => {

    /*const loggedInUser = useLoggedInUser()*/

    const loggedInUser = currentUser((state) => state.currentUser)


    const postsArray = posts((state) => state.postsArray)
    const setPostsArray = posts((state) => state.setPostsArray)

    async function deletePost() {
        const user = {
            postId: item._id,
        }
        const options = {
            method: "POST",
            headers: {
                "content-type" : "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(user)
        }
        try {
            const res = await fetch("http://localhost:2500/api/deletePost", options)
            const data = await res.json()
            console.log(data)
            if(data.success) {
                setPostsArray(data.posts)
                toast.success(data.message, {
                    position: "bottom-right"
                })
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className={ "PostCard"} style={{animationDelay: `${index * 0.1}s`}}>

            <Link to={`/post/${item._id}`}>
                <img src={item.image} alt=""/>
                <h4>{item.title}</h4>
                <p>@{item.createdBy.username}</p>
            </Link>
            {
                loggedInUser &&
                item.createdBy.username === loggedInUser.username &&
                <button onClick={deletePost}>❌</button>
            }

        </div>
    );
};

export default PostCard;