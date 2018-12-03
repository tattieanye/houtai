  const express=require('express');
  const app=express();
  const bodyParser=require('body-parser')
  const email=require('./sendmail.js')
  const path = require('path')
  const cors=require('cors')
  const db = require('./mongoose.js')
 
  // console.log(email)
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }))


  app.use(express.static(path.join(__dirname,'./admin')))
  app.use(express.static(path.join(__dirname,'./public')))
  app.use(express.static(path.join(__dirname,'./src')))

  const adminRouter = require('./src/router/admin.js')
  const uploadRouter = require('./src/router/upload.js')
  const goodsRouter = require('./src/router/goods.js')
  app.use('/admin',adminRouter);
  app.use('/upload',uploadRouter);
  app.use('/goods',goodsRouter);
  

app.listen(3001,()=>{
    console.log('server start in port'+3001);
})
