const mongoose = require ("mongoose")
const ObjectId= mongoose.Schema.Types.ObjectId

const postSchema= new mongoose.Schema({
userId:{type:ObjectId,required:true,ref:"customer",trim:true},
title:{type:String,required:true},
description:{type:String,required:true},
likes: { type: Array, default: []},

comments:{ type: Array, default: []},
isDeleted:{type:Boolean,default:false}
},{ timestamps:true })



module.exports = mongoose.model("Post", postSchema);