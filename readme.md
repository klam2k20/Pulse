<p align="center">
    <img src="frontend/public/feed.gif" height="500">
</p>

## Overview

Pulse is a robust social media application crafted using the advanced MERN stack. It offers a seamless user experience,
allowing users to effortlessly register and update their profiles, create, edit, and delete posts, share their thoughts
by commenting on other posts, show appreciation by liking posts, and keep up with their favorite users by following them.

## Technology

- <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
- <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
- <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
- <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
- <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
- <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white">
- <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue">
- <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white">

## Features

- Responsive Design
<p align="center">
    <img src="frontend/public/responsive.gif" height="400">
</p>

- Register & Edit Profile
<p align="center">
    <img src="frontend/public/register.gif" height="400">
</p>
<p align="center">
    <img src="frontend/public/updateProfile.gif" height="400">
</p>

- Create & Edit Post
<p align="center">
    <img src="frontend/public/createPost.gif" height="400">
</p>
<p align="center">
    <img src="frontend/public/updatePost.gif" height="400">
</p>

- Like & Comment on Post
<p align="center">
    <img src="frontend/public/likeAndComment.gif" height="400">
</p>

- Follow Users
<p align="center">
    <img src="frontend/public/follow.gif" height="400">
</p>

- Notifications
<p align="center">
    <img src="frontend/public/notification.gif" height="400">
</p>

## Getting Started

### Prerequisites

- yarn/npm
- Setup Google Cloud Console Credentials
- Sign up for MongoDB Atlas
  - Create a shared database

### Backend Installation

```sh
# Clone the repo
git clone https://github.com/klam2k20/Pulse.git

# Create .env
cd Pulse/backend
PORT=8080
CLIENT=http://localhost:5173
JWT_SECRET=<SECRET>
MONG0DB_URI=<MONGODBURI>

# Install dependencies
npm install

# Start the server
npm start
```

### Frontend Installation

```sh
cd ../frontend

# Install dependencies
npm install

# Start the application
npm run dev
```
