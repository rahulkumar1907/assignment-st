const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({

   fullName:{type:String,required:true},

    mobile:{type:Number,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    gender:{type:String,required:true,enum:["male","female","others"]},
    followers:{type:Array,default:[]},
    blocked:{type:Array,default:[]},
    following:{type:Array,default:[]},
    profile:{type:String,required:true,enum:["public","private"]},
    isDeleted:{type:String,default:false}
    

},{ timestamps: true }
)
module.exports = mongoose.model('user', userSchema)