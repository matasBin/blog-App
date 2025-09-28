import React, {useEffect, useRef} from 'react';
import {currentUser, posts} from "../store/allStatesStore";
import {useParams} from "react-router-dom";
import {convertDate} from "../utils/convertDate";

const SinglePostPage = () => {

    const isLoggedIn = currentUser((state) => state.isLoggedIn)

    const {postId} = useParams()

    const postsArray = posts((state) => state.postsArray)
    const setPostsArray = posts((state) => state.setPostsArray)

    const commentInput = useRef()

    const post = postsArray.find(post => post._id === postId)

    useEffect(() => {
        async function getPosts() {
            const res = await fetch("http://localhost:2500/api/allPosts")
            const data = await res.json()
            console.log(data)
            setPostsArray(data)
        }

        getPosts()
    }, [])

    async function addComment() {
        const comment = {
            postId: postId,
            text: commentInput.current.value
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(comment)
        }
        const res = await fetch("http://localhost:2500/api/addComment", options)
        const data = await res.json()
        console.log(data)
        if (data.success) {
            setPostsArray(data.posts)
            commentInput.current.value = ""
        }

    }

    return (
        <div className={"SinglePostPage"}>
            {
                post &&
                <div className={"postContainer"}>
                    <div className="top">
                        <div className="postImage">
                            <img src={post.image} alt=""/>
                        </div>

                        <div className="commentBox">
                            <h3>Comments</h3>
                            <div className="allComments">
                                {

                                    post.comments.map((item, index) =>
                                        <div key={index} className={"comment"}>
                                            <img src={item.createdByImage} alt=""/>
                                            <div className="commentContent">
                                                <div className="commentHeader">
                                                    <h4>{item.createdBy}</h4>
                                                    <span className={"commentDate"}>{convertDate(item.date)}</span>
                                                </div>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                isLoggedIn &&
                                <div className="addComment">
                                    <input type="text" placeholder={"Add Comment"} ref={commentInput}/>
                                    <button onClick={addComment}>Add Comment</button>
                                </div>
                            }

                        </div>

                    </div>

                    <div className="bottom">
                        <div className="postDetails">
                            <h4>{post.title}</h4>
                            <p>@{post.createdBy.username}</p>
                            <p>{post.description}</p>
                        </div>
                    </div>
                </div>

            }

        </div>
    );
};

export default SinglePostPage;