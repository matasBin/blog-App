Full-Stack Social Blogging Platform.

A modern, full-stack social blogging application with real-time features, AI-powered content creation, and user interactions.

🌟 Features
Frontend (React)
User Authentication - Login/Register with JWT
Post Management - Create, view, and delete blog posts
AI-Powered Content Creation - Generate posts using Gemini AI with different moods (Romantic, Fun, Serious)
Real-time Chat - Live chat room with message history
User Profiles - Customizable profiles with image uploads
Social Interactions - "Poke" other users and receive notifications
Responsive Design - Modern dark theme UI

Backend (Node.js/Express)
RESTful API - Complete CRUD operations
Socket.IO - Real-time notifications and chat
JWT Authentication - Secure user sessions
MongoDB Integration - Data persistence with Mongoose
AI Integration - Gemini AI for content generation
Input Validation - Comprehensive request validation

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)
MongoDB
Gemini AI API key

🛠️ Tech Stack
Frontend (/front)
React - UI framework
Zustand - State management
React Router - Navigation
Socket.IO Client - Real-time communication
React Toastify - Notifications

Backend (/NodeJs)
Node.js & Express - Server framework
MongoDB & Mongoose - Database
Socket.IO - WebSockets
JWT - Authentication
bcrypt - Password hashing
Google Gemini AI - Content generation

🔧 API Endpoints
POST /api/register - User registration
POST /api/login - User login
POST /api/createPost - Create new post
POST /api/createPostAI - AI-generated post
GET /api/allPosts - Get all posts
GET /api/allUsers - Get all users
PUT /api/editProfileImg - Update profile image
POST /api/addComment - Add comment to post

🎯 Usage
Register/Login - Create an account or login to access all features
Create Posts - Write posts manually or use AI generation
Interact - Comment on posts, poke other users, chat in real-time
Customize - Update your profile image and username
Explore - Browse posts and user profiles
