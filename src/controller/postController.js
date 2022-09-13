const postModel= require("../model/postModel")
const userSchema= require("../model/userSchema")
const validator = require("../validator")

const createPost = async(req,res)=>{
    let data = req.body
    if(!validator.isValidValue(data.title))  {return res.status(400).send({msg:"enter the title"})}
    if(!validator.isValidValue(data.description)) {return res.status(400).send({msg:"enter the description"})}

    const saveData =await postModel.create(data)

    res.status(201).send({data:saveData})
}

//...........................getPost...........................

 //................................get all posts...........................
const getAllData=async(req,res)=>{
   try{let userId= req.params.userId
 
   let getUser= await userSchema.findOne({_id:userId})
   if(!getUser) return res.status(400).send("incorrect userId")

   let getPost= await postModel.find({userId:getUser})
   res.status(200).send(getPost)
}
catch(err){res.status(500).send(err.message)}
}
//................................delete post...............................



module.exports={createPost,getAllData}