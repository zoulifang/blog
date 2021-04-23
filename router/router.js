const {Router} = require('express')
const User = require('../model/user')
// 数据模型大写
const router = new Router()

router.get('/login',(req,res)=>{
  res.render('login.html')
}
)

router.get('/register',(req,res)=>{
  res.render('register.html')
}
)

router.post('/register',(req,res)=>{
    //获取表单
    //判断用户是否存在
    //若存在则不能创建用户

    // 判断是否同时满足：{$OR:[{email:req.body.email},{nickName:req.body.nickName}]}

    User.findOne({email:req.body.email})
    .then((data)=>{
      if(data){
        return res.status(200).json({err_code:1,message:'email has been exist'})
      }

      let user = new User(req.body)
      user.save(user)
      .then(()=>{res.status(200).json({err_code:0,message:'register successully'})})
      .catch((err)=>{res.status(500).json({err_code:500,message:'Server Error'})})
      
    
    })
    .catch((err)=>{res.status(500).json({err_code:500,message:'Server Error'})})

    // User.find().then((data)=>{console.log(data)})
})


module.exports = router