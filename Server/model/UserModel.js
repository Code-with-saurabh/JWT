const mongoose = require("mongoose")


const Schema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:0,
        max:120
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }

})

module.exports = mongoose.model("Users",Schema)