const {Router} = require('express')
const User = require('../model/user')
//用md5给密码加密
const md5 = require('blueimp-md5')
// 数据模型大写
const router = new Router()

router.get('/login',(req,res)=>{
  res.render('login.html')
}
)

router.post('/login',(req,res)=>{
 let body = req.body

  User.findOne({
    email:body.email,
    password:md5(md5(req.body.password))
  })

  .then((data)=>{
    if(data){
      req.session.user = data
      
      return res.status(200).json({
        err_code:0,
        message:'valid'
      })
    }
      //  密码加密（两次）
    return res.status(200).json({
      err_code:1,
      message:'email or password invalid'
    })
  })

  .catch((err)=>{res.status(500).json({
    err_code:500,
    message:'Server Error'
  })})

})

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
          //  密码加密（两次）
        req.body.password = md5(md5(req.body.password))

        let user = new User(req.body)
        user.save(user)
        .then(()=>{
          //把用户信息用session存储起来
          req.session.user = user

          res.status(200).json({err_code:0,message:'register successully'})
        })
        .catch((err)=>{res.status(500).json({err_code:500,message:'Server Error'})})    

      })
      .catch((err)=>{res.status(500).json({err_code:500,message:'Server Error'})})
    
})

router.get('/',(req,res)=>{
  res.render('home.html',{
      user: req.session.user
  })

})

router.get('/logout',(req,res)=>{
  // req.session.user = null
  delete req.session.user
  res.redirect('/')
})


module.exports = router