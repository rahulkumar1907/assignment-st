const userSchema = require("../model/userSchema")

const validator= require("../validator")
const jwt = require("jsonwebtoken")
const postModel = require("../model/postModel")


const createUser=async(req,res)=>{
   try{ let data = req.body
    if(!validator.isValidValue(data)) return res. status(400).send({msg:"body can't be empty"})
    let {fullName,email,mobile,password}= data
    
   if(!validator.isValidName(fullName)) return res.status(400).send({msg:"write a proper name"})
 //......................for mobile................................
   if(!validator.isValidPhone(mobile)) return res.status(400).send({msg:"write a proper mobile number"})
   let findMobile= await userSchema.findOne({mobile:mobile})
   if(findMobile) res.status(404).send("this number is already registered")
//...............for email........
   if(!validator.isValidEmail(email)) return res.status(400).send({msg:"write a proper email"})
   let findemail= await userSchema.findOne({email:email})
   if(findemail) res.status(404).send("this email is already registered")
   
   if(!validator.isValidPassword(password)) {return res.status(400).send({msg:"password length should be 8-15 char & contain atleat 1 number "})}
    
    let createData = await userSchema.create(data)
    res.status(201).send({msg:createData})
   }
   catch(err){
    res.status(500).send(err.message)
   }
}
//................................................userLogin

const userLogIn=async(req,res)=>{
    try{
        const logInData= req.body
        let {email,password}= logInData
        if(!validator.isValidValue(email )){
           return  res.status(400).send("enter the email")
        }
        if(!validator.isValidValue(password )){
            return  res.status(400).send("enter the password")
         }

        let userDetails= await userSchema.findOne({email})
       if(!userDetails){
       return res.status(404).send("incorrect email")
       }
       let findPassword= await userSchema.findOne({password})
       if(!findPassword){return res.status(404).send("incorrect password")}
      // const userId= userDetails._id
       let token = jwt.sign(
        {
        userId:userDetails._id,
        
        exp: Math.floor(Date.now()/1000)+24*60*60
       },
       "reUnion")

       res.setHeader("my-api-key", token)
       
       res.status(200).send({status:true,data:{email,password,token}})
    }
    catch(err){
        res.status(500).send(err.msg)
    }
}

//...........................folllow.....................................................
const followers=async(req,res)=>{
    let mainUser= req.params.userId
    
    let followUser= req.body.userId
   try{
          if(mainUser!=followUser){   
          let main= await userSchema.findOne({_id:mainUser})
          if(!main) return res.status(404).send({msg:"invalid userId"})
          let currUser= await userSchema.findOne({_id:followUser})
  

          if(!main.followers.includes(followUser)){
            let finalUser= await main.updateOne({$push:{followers:followUser}})
            let followingUser= await currUser.updateOne({$push:{following:mainUser}})
            res.status(200).send({data:"successfull"})
          } else
            res.status(403).send({msg:"already followed"})
      }
 }
       catch(err){res.status(500).send(err.message)}
}

//..........................................unfollow...............................................
const unfollowUser= async(req,res)=>{
  let mainUser= req.params.userId
 
  let followUser= req.body.userId
 try{
        if(mainUser!=followUser){   
        let main= await userSchema.findOne({_id:mainUser})
        if(!main) return res.status(404).send({msg:"invalid userId"})
        let currUser= await userSchema.findOne({_id:followUser})

        if(main.followers.includes(followUser)){
          let finalUser= await main.updateOne({$pull:{followers:followUser}})
          let followingUser= await currUser.updateOne({$pull:{following:mainUser}})
          res.status(200).send({data:"successfull"})
        } else
          res.status(403).send({msg:"u never followed this account"} )
    }
}
     catch(err){res.status(500).send(err.message)}
}



module.exports={ createUser ,userLogIn,followers,unfollowUser}