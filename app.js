const express = require('express')
const path = require('path')
const router = require('./router/router.js')
const session =  require('express-session')

const app = express()

app.use('/node_modules/',express.static( path.join(__dirname + '/node_modules') ))
app.use('/public/',express.static( path.join(__dirname + '/public') ))
app.engine('html',require('express-art-template'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(router)

app.listen('3000',()=>{
  console.log('服务开启成功...');
})