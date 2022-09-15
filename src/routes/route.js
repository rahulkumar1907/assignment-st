const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/common')
const { createUser, userLogIn, followers, unfollowUser, blockUser, unBlockUser, updateUser, deleteUser,getAllData } = require('../controller/userController');
const { createPost, likePost, dislikePost, deletePost, updatePost,  } = require('../controller/postController');




router.post('/createUser', createUser);

router.post('/login', userLogIn);
router.post('/createpost', createPost);
router.post('/followers/:userId', followers);
router.post('/unfollowUser/:userId', unfollowUser);
router.post('/likepost/:postId', likePost);
router.post('/dislikepost/:postId', dislikePost);
router.delete('/deletepost/:postId', deletePost);
router.post('/blockuser/:userId', blockUser);
router.post('/unblockuser/:userId', unBlockUser);
router.put('/updateuser/:userId', updateUser);
router.put('/updatepost/:postId', updatePost);
router.delete('/deleteuser/:userId', deleteUser);
router.get('/getdetail/:userId', getAllData);
// //==post tweet

// router.get('/getdetail', getAllData);




module.exports = router