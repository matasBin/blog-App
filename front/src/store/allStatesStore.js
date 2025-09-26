import {create} from "zustand"

const posts = create((set) => ({
    postsArray: [],
    setPostsArray: (newPostsArray) => set({postsArray: newPostsArray})
}))

const users = create((set) => ({
    usersArray: [],
    setUsersArray: (newUsersArray) => set({usersArray: newUsersArray})
}))

const currentUser = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (newIsLoggedIn) => set({isLoggedIn: newIsLoggedIn}),

    currentUser: null,
    setCurrentUser: (newCurrentUser) => set({currentUser: newCurrentUser})
}));

const changeForm = create((set) => ({
    toLogin: true,
    setToLogin: (newToLogin) => set({toLogin: newToLogin})
}))

export {posts, users, currentUser, changeForm}