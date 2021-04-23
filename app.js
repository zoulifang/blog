const express = require('express')
const router = require('./router/router.js')
const app = express()

app.use('/node_modules/',express.static('./node_modules'))
app.use('/public/',express.static('./public'))
app.engine('html',require('express-art-template'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(router)

app.listen('3000',()=>{
  console.log('服务开启成功...');
})