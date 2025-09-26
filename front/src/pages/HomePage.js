import React, {useEffect} from 'react';
import PostCard from "../components/PostCard";
import {posts, users} from "../store/allStatesStore"
import UserCard from "../components/UserCard";
import {ToastContainer} from "react-toastify";
import useLoggedInUser from "../hooks/useLoggedInUser";

const HomePage = () => {

    const postsArray = posts((state) => state.postsArray)
    const setPosts = posts((state) => state.setPostsArray)

    const usersArray = users((state) => state.usersArray)
    const setUsersArray = users((state) => state.setUsersArray)

    useEffect(() => {
        async function getPosts() {
            const res = await fetch("http://localhost:2500/api/allPosts")
            const data = await res.json()
            console.log(data)
            setPosts(data)
        }
        getPosts()

    }, []);

    useEffect(() => {
        async function getUsers() {
            const res = await fetch("http://localhost:2500/api/allUsers")
            const data = await res.json()
            console.log(data)
            setUsersArray(data)
        }
        getUsers()
    }, [])

    return (
        <div className={ "HomePage"}>
            <div className="posts">
                {
                    postsArray &&
                    postsArray.map((item, index) =>
                        <PostCard key={index} item={item} index={index}/>
                    )
                }
            </div>
            <div className="users">
                {
                    usersArray &&
                    usersArray.map((item, index) =>
                    <UserCard item={item} key={index} index={index}/>
                    )
                }
            </div>
            <ToastContainer/>


        </div>
    );
};

export default HomePage;