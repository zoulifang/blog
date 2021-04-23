const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new Schema({
  nickName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  createdTime:{
    type:Date,
    default:Date.now
    // 不能写Date.now（），因为会在创建的时候立即执行。
  },
  gender:{
    type:Number,
    enum:[0,1],
    default:0
  },
  avatar:{
    type:String,
    default:'/public/img/default_avatar.jpg'
  },
  birthday:{
    type:Number,
  },
  status:{
    // 禁言
    type:Number,
    enum:[0,1],
    default:1
  }
  
})

module.exports = mongoose.model('User',userSchema)