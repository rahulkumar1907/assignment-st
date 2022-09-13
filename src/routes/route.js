const express = require('express');
const router = express.Router();
//const { authentication,authorization } = require("../middleware/auth");
const { createUser ,userLogIn,followers,unfollowUser} = require('../controller/userController');
const {createPost,getAllData} = require('../controller/postController');



//==Login User
router.post('/createUser', createUser);

router.post('/login',userLogIn );

router.put('/followers', followers);
router.put('/unfollowUser', unfollowUser);

// //==post tweet
router.post('/postTweet', createPost);
router.get('//getNewsFeed', getAllData);




module.exports = router