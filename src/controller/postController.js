const postSchema = require("../model/postModel")
const userSchema = require("../model/userSchema")
const validator = require("../validator")
const mongoose = require("mongoose")
const uploadFile = require("./awsController")

const createPost = async (req, res) => {
  try {
    const data = req.body
    if (!Object.keys(data).length)
      return res.status(400).send({
        status: false,
        message: "please provide product details to create.",
      })

    const { title, description, likes, comments, userId, profile } = data
    const files = req.files
    if (!userId) { res.status(400).send({ status: false, message: "please provide userid" }) }
    if (!title) { res.status(400).send({ status: false, message: "please provide title" }) }
    if (!description) { res.status(400).send({ status: false, message: "please provide description" }) }

    /********************************Validation ends**********************************/

    const postPhoto = await uploadFile(files[0])

    const postData = {
      title: title,
      description: description,
      likes: likes,
      comments: comments,
      userId: userId,
      postImage: postPhoto,
      profile: profile

    }
    const createPost = await postSchema.create(postData)
    res.status(201).send({
      status: true,
      message: "Success",
      data: createPost,
    })
  } catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
}

const likePost = async (req, res) => {
  try {
    let postId = req.params.postId

    let userId = req.body.userId
    if (postId) {
      if (mongoose.Types.ObjectId.isValid(postId) == false) {
        return res
          .status(400)
          .send({ status: false, message: "postId Invalid" });
      }
    }
    if (userId) {
      if (mongoose.Types.ObjectId.isValid(userId) == false) {
        return res
          .status(400)
          .send({ status: false, message: "userId Invalid" });
      }
    }
    let getPost = await postSchema.findOne({ _id: postId })
    // console.log(getPost)
    if (!getPost) { return res.status(400).send({ msg: "enter a valid id" }) }
    if (!getPost.likes.includes(userId)) {
      await getPost.updateOne({ $push: { likes: userId } })
    }
    res.status(200).send({ msg: `your post has been liked by ${userId}`, data: getPost })
  }
  catch (err) { res.status(500).send(err.message) }
}
//...........................dislikepost............................
const dislikePost = async (req, res) => {
  try {
    let postId = req.params.postId
    let userId = req.body.userId
    if (postId) {
      if (mongoose.Types.ObjectId.isValid(postId) == false) {
        return res
          .status(400)
          .send({ status: false, message: "postId Invalid" });
      }
    }
    if (userId) {
      if (mongoose.Types.ObjectId.isValid(userId) == false) {
        return res
          .status(400)
          .send({ status: false, message: "userId Invalid" });
      }
    }
    let getPost = await postSchema.findOne({ _id: postId })
    if (!getPost) { return res.status(400).send({ msg: "enter a valid id" }) }
    if (getPost.likes.includes(userId)) {
      await getPost.updateOne({ $pull: { likes: userId } })
    }
    res.status(200).send({ msg: `your post has been disliked from ${userId}`, data: getPost })
  }
  catch (err) { res.status(500).send(err.message) }
}
const deletePost = async (req, res) => {
  try {
    let postId = req.params.postId
    if (postId) {
      if (mongoose.Types.ObjectId.isValid(postId) == false) {
        return res
          .status(400)
          .send({ status: false, message: "postId Invalid" });
      }
    }
    let findId = await postSchema.findOne({ _id: postId })
    if (!findId) return res.status(404).send({ msg: "invalid postId" })
    let deletedata = await postSchema.findOneAndUpdate({ _id: postId }, { $set: { isDeleted: true } }, { new: true })
    res.status(200).send({ msg: "post has been deleted", deletedata })
  }

  catch (err) { res.status(500).send(err.message) }
}
const updatePost = async (req, res) => {
  try {
    let postId = req.params.postId
    if (postId) {
      if (mongoose.Types.ObjectId.isValid(postId) == false) {
        return res
          .status(400)
          .send({ status: false, message: "postId Invalid" });
      }
    }
    let findId = await postSchema.findOne({ _id: postId })
    if (!findId) return res.status(404).send({ msg: "invalid postId" })

    let data = req.body
    if (!validator.isValidValue(data)) {
      return res.status(404).send({ msg: "enter the valid data" })
    }

    let updateData = await postSchema.findOneAndUpdate({ _id: postId }, { $set: data }, { new: true })
    res.status(200).send({ data: updateData })
  }
  catch (err) { res.status(500).send(err.message) }
}




module.exports = { createPost, likePost, dislikePost, deletePost, updatePost }