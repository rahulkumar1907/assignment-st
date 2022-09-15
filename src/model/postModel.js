const mongoose = require ("mongoose")
const ObjectId= mongoose.Schema.Types.ObjectId

const postSchema= new mongoose.Schema({
userId:{type:ObjectId,required:true,ref:"user",trim:true},
title:{type:String,required:true},
description:{type:String,required:true},
likes: { type: Array, default: []},
postImage: { type: String, required: true, trim: true },
comments:{ type: Array, default: []},
profile:{type:String,required:true,enum:["public","private"]},
isDeleted:{type:Boolean,default:false}
},{ timestamps:true })



module.exports = mongoose.model("Post", postSchema);