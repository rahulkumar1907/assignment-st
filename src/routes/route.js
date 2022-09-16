const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/common')
const { createUser, userLogIn, followers, unfollowUser, blockUser, unBlockUser, updateUser, deleteUser,getAllData } = require('../controller/userController');
const { createPost, likePost, dislikePost, deletePost, updatePost,  } = require('../controller/postController');



router.post('/createUser', createUser);
router.post('/login', userLogIn);
router.post('/createpost',middleware.authentication, createPost);
router.post('/followers/:userId',middleware.authentication,middleware.authorization, followers);
router.post('/unfollowUser/:userId',middleware.authentication,middleware.authorization, unfollowUser);
router.post('/likepost/:postId',middleware.authentication, likePost);
router.post('/dislikepost/:postId',middleware.authentication, dislikePost);
router.delete('/deletepost/:postId',middleware.authentication, deletePost);
router.post('/blockuser/:userId',middleware.authentication,middleware.authorization, blockUser);
router.post('/unblockuser/:userId',middleware.authentication,middleware.authorization, unBlockUser);
router.put('/updateuser/:userId',middleware.authentication,middleware.authorization, updateUser);
router.put('/updatepost/:postId',middleware.authentication,middleware.authorization, updatePost);
router.delete('/deleteuser/:userId',middleware.authentication,middleware.authorization, deleteUser);
router.get('/getdetail/:userId',middleware.authentication, getAllData);







module.exports = router