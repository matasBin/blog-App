const express = require('express');
const Router = express.Router();
const {
    login,
    register,
    createPost,
    getPosts,
    getUsers,
    getLoggedInUser,
    editProfileImg,
    editUsername,
    editPassword,
    addComment,
    createPostAI,
    deletePost,
} = require("../controllers/mainController")

const {
    validateRegister,
    validateLogin,
    validateCreatePost,
    validateEditProfileImg,
    validateEditUsername,
    validateEditPassword,
    validateAddComment,
    validateCreatePostAI
} = require("../midleware/authValidators")

const {jwtDecode} = require("../midleware/authorization");


Router.post("/register", validateRegister, register)
Router.post("/login", validateLogin, login)
Router.post("/createPost", jwtDecode, validateCreatePost, createPost)
Router.get("/allUsers", getUsers)
Router.get("/allPosts", getPosts)
Router.get("/loggedInUser", jwtDecode, getLoggedInUser)
Router.put("/editProfileImg/:userId",jwtDecode, validateEditProfileImg, editProfileImg)
Router.put('/editUsername/:userId', jwtDecode, validateEditUsername, editUsername)
Router.put('/editPassword/:userId', jwtDecode, validateEditPassword, editPassword)
Router.post("/addComment", jwtDecode, validateAddComment, addComment)
Router.post("/createPostAI", jwtDecode, validateCreatePostAI, createPostAI)
Router.post("/deletePost", jwtDecode, deletePost)

module.exports = Router;