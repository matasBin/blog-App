const jwt = require('jsonwebtoken');
const userDb = require("../models/userSchema")
const postDb = require("../models/postSchema")
const dotenv = require("dotenv")
const {generateUsername} = require("unique-username-generator")
const ai = require("../ai")
const extractJsonFromMarkdown = require("../modules/jsonExtraction")

dotenv.config()



module.exports = {

    register: async (req, res) => {
        const email = req.email
        const hashedPassword = req.password
        const username = generateUsername()

        const newUser = new userDb({
            username: username,
            email: email,
            password: hashedPassword
        })

        await newUser.save()

        res.send({success: true, message: "User created"})
    },

    login: async (req, res) => {
        const user = req.user
        const email = req.email
        const username = req.username

        const token = jwt.sign({email: email, userId: user._id}, process.env.JWT_SECRET) /*Pasizaist su expires in*/
        res.send({success: true, message: "Login successful", username: username, userId: user._id, token: token, user: user})

    },

    createPost: async (req, res) => {
        const {title, image, description} = req.body
        const decodedToken = req.decodedToken

        const user = await userDb.findOne({_id: decodedToken.userId})

        const creator = {
            username: user.username,
            userId: decodedToken.userId,
        }

        const newPost = new postDb({
            title: title,
            image: image,
            description: description,
            createdBy: creator
        })

        await newPost.save()

        res.send({success: true, message: "Post created"})

    },

    createPostAI: async (req, res) => {
        const {topic, image, prompt} = req.body
        const decodedToken = req.decodedToken

        const user = await userDb.findOne({_id: decodedToken.userId})

        const newPrompt = `${prompt}, image: ${image}, topic: ${topic}`

        const response = await ai(newPrompt)
        const aiResponseText = response.candidates[0].content.parts[0].text
        console.log("Raw AI response: ", aiResponseText)

        let newResponse
        try {
            newResponse = extractJsonFromMarkdown(aiResponseText)
            console.log("Extracted JSON: ", newResponse)
        } catch (parseError) {
            console.error("Error parsing AI response:", parseError);
            return res.send({
                success: false,
                message: "Failed to parse AI response as JSON",
                rawResponse: aiResponseText,
                parseError: parseError.message
            })
        }

        const creator = {
            username: user.username,
            userId: decodedToken.userId,
        }

        const newPost = new postDb({
            title: newResponse.title,
            image: image,
            description: newResponse.description,
            createdBy: creator,
        })

        await newPost.save()
        return res.send({success: true, message: "Post created", response: newResponse})
    },

    getPosts: async (req, res) => {
        const posts = await postDb.find()
        res.send(posts)
    },

    getUsers: async (req, res) => {
        const users = await userDb.find({}, {password: 0})
        res.send(users)
    },

    getLoggedInUser: async (req, res) => {
        const decodedToken = req.decodedToken
        const user = await userDb.findOne({_id: decodedToken.userId})
        res.send({success: true, user: user})
    },

    editProfileImg: async (req, res) => {
        const userId = req.userId
        const image = req.image

        const updatedUser = await userDb.findOneAndUpdate({_id: userId}, {image: image})
        const user = await userDb.findOne({_id: userId})
        res.send({success: true, message: "Profile image updated", user: user})
    },

    /*pakeicia ir visus userio postu createdBy username*/
    editUsername: async (req, res) => {
        const username = req.username
        const userId = req.userId


        const updatedUser = await userDb.findOneAndUpdate({_id: userId}, {username: username})
        const user = await userDb.findOne({_id: userId})

        const bulkWrite = await postDb.bulkWrite([
            {
                updateMany: {
                    filter: {'createdBy.userId': userId},
                    update: {
                        $set: {'createdBy.username': username}
                    }
                }
            }
        ])

        const posts = await postDb.find()
        res.send({success: true, message: "Username updated", user: user, posts: posts})
    },

    editPassword: async (req, res) => {
        const userId = req.userId
        const hashedPassword = req.hashedPassword


        const updatedUser = await userDb.findOneAndUpdate({_id: userId}, {password: hashedPassword})
        res.send({success: true, message: "Password updated"})
    },

    addComment: async (req, res) => {
        const user = req.user
        const post = req.post
        const text = req.text
        const postId = req.postId

        const newComment = {
            text: text,
            createdBy: user.username,
            createdByImage: user.image
        }

        const updatedPost = await postDb.findOneAndUpdate({_id: postId}, {
            comments: [...post.comments, newComment]
        })

        const posts = await postDb.find()
        res.send({success: true, message: "Comment added", posts: posts})
    },

    deletePost: async (req, res) => {
        const {postId} = req.body
        const decodedToken = req.decodedToken

        const user = await userDb.findOne({_id: decodedToken.userId})
        const post = await postDb.findOne({_id: postId})

        if(!user || !post) {
            return res.send({success: false, message: "Missing required fields"})
        }

        if(!user) {
            return res.send({success: false, message: "User not found"})
        }

        if(!post) {
            return res.send({success: false, message: "Post not found"})
        }

        if(user.username !== post.createdBy.username) {
            return res.send({success: false, message: "You are not the creator of this post"})
        }

        const deletedPost = await postDb.findOneAndDelete({_id: postId})

        const allPosts = await postDb.find()
        return res.send({success: true, message: "Post deleted", posts: allPosts})

    }
}