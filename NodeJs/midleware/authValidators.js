const userDb = require("../models/userSchema")
const bcrypt = require("bcrypt");
const postDb = require("../models/postSchema");
const validator = require("email-validator")

const imageUrlRegex = /^https?:\/\//;
const textLengthRegex = /^.{3,20}$/;

module.exports = {

    validateRegister: async (req, res, next) => {
        const {email, password, password2} = req.body;

        if (!email || !password || !password2) {
            return res.send({success: false, message: "Missing required fields"})
        }

        if(!validator.validate(email)) {
            return res.send({success: false, message: "Invalid email"})
        }

        if(!textLengthRegex.test(password)) {
            return res.send({success: false, message: "Password must be between 3 and 20 characters long"})
        }

        const duplicateUser = await userDb.findOne({email: email})
        if (duplicateUser) {
            return res.send({success: false, message: "User already exists"})
        }

        if (password !== password2) {
            return res.send({success: false, message: "Passwords do not match"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        req.email = email
        req.password = hashedPassword

        next()
    },

    validateLogin: async (req, res, next) => {
        const {email, password} = req.body
        const user = await userDb.findOne({email: email})

        if(!email || !password) {
            return res.send({success: false, message: "Missing required fields"})
        }

        if(!user) {
            return res.send({success: false, message: "User not found"})
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match) {
            return res.send({success: false, message: "Invalid password"}) /*Pakeist i invalid credentials vangiai*/
        }

        req.email = email
        req.user = user
        req.username = user.username


        next()
    },

    validateCreatePost: async (req, res, next) => {
        const {title, image, description} = req.body
        /*decodedToken yra userio objectas su email ir id*/
        const decodedToken = req.decodedToken

        if(!title || !image || !description || !decodedToken) {
            return res.send({success: false, message: "Missing required fields"})
        }

        if(!imageUrlRegex.test(image)) {
            return res.send({success: false, message: "Invalid image URL"})
        }

        next()
    },

    validateEditProfileImg: async (req, res, next) => {
        const {userId} = req.params
        const {image} = req.body
        if(!userId || !image) {
            return res.send({success: false, message: "Missing required fields"})
        }

        if(!imageUrlRegex.test(image)) {
            return res.send({success: false, message: "Invalid image URL"})
        }

        req.userId = userId
        req.image = image

        next()
    },

    validateEditUsername: async (req, res, next) => {
        const {userId} = req.params
        const {username} = req.body
        if(!userId || !username) {
            return res.send({success: false, message: "Missing required fields"})
        }

        const duplicateUsername = await userDb.findOne({username: username})
        if(duplicateUsername) {
            return res.send({success: false, message: "Username already exists"})
        }

        req.userId = userId
        req.username = username

      next()
    },

    validateEditPassword: async (req, res, next) => {
        const {oldPassword, newPassword, newPassword2} = req.body
        const {userId} = req.params

        if(!oldPassword || !newPassword || !newPassword2) {
            return res.send({success: false, message: "Missing required fields"})
        }

        const user = await userDb.findOne({_id: userId})
        const match = await bcrypt.compare(oldPassword, user.password)

        if (!user) {
            return res.send({success: false, message: "User not found"})
        }

        if(!match) {
            return res.send({success: false, message: "Invalid password"})
        }

        if(newPassword !== newPassword2) {
            return res.send({success: false, message: "Passwords do not match"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        req.userId = userId
        req.hashedPassword = hashedPassword

        next()
    },

    validateAddComment: async (req, res, next) => {
        const {postId, text} = req.body
        const decodedToken = req.decodedToken

        if(!postId || !text) {
            return res.send({success: false, message: "Missing required fields"})
        }

        const user = await userDb.findOne({_id: decodedToken.userId})
        const post = await postDb.findOne({_id: postId});

        if(!user) {
            return res.send({success: false, message: "User not found"})
        }

        if(!post) {
            return res.send({success: false, message: "Post not found"})
        }

        req.user = user
        req.post = post
        req.text = text
        req.postId = postId

        next()
    },

    validateCreatePostAI: async (req, res, next) => {
        const {topic, image, prompt} = req.body
        const decodedToken = req.decodedToken

        if(!topic || !image || !prompt) {
            return res.send({success: false, message: "Missing required fields"})
        }

        if(!textLengthRegex.test(topic)) {
            return res.send({success: false, message: "Topic must be between 3 and 20 characters long"})
        }

        if(!imageUrlRegex.test(image)) {
            return res.send({success: false, message: "Invalid image URL"})
        }

        next()
    }
}