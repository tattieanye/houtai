const express=require('express');
const app = express();
const Router=express.Router();
//数据模型引入
const user=require('../mongo/model/usermodel.js')
const email = require('../../sendmail.js')

// 邮箱查询
Router.post("/checkMail",(req,res)=>{
          let mail = req.body.mail;
          user.find({mail:mail})
          .then((data)=>{
           if(data[0].mail=mail){
              res.send('1')
            }
            else{
              res.send('0')
            }
          })
          .catch((err)=>{
           res.send('0');
          })
  })




  let check={}
  //获取验证码
  Router.post("/getCode",(req,res)=>{
    // console.log(req.body)
    let mail=req.body.mail
    if (!mail) {return res.send('参数错误')}
    let code=parseInt(Math.random(0,1)*1000)
    check[mail]=code
    //发送邮件是异步操作
     email.sendMail(mail,code,(state)=>{
            if (state) {
                res.send('0')
            }else{
               res.send('1')
            }
            
      })

  })
 // 验证码注册
 Router.post("/reg",(req,res)=>{
   let {mail,ps,code}=req.body
   console.log({ps,mail,code})

   console.log(check)
   if (check[mail]==code) {
      
       
       user.insertMany({mail,ps})
       .then((data)=>{
        res.send('1')
       })
       .catch((err)=>{

       console.log(err)
       res.send({err:-1,msg:'0',data:null})
       })
       
   }else{
      res.send('0')
   }

 })
// 登录
 Router.post("/login",(req,res)=>{
      let mail = req.body.mail;
      let ps = req.body.ps;
      // console.log(mail,ps)

      user.find({mail:mail,ps:ps})
          .then((data)=>{
           if((data[0].mail=mail)&&(data[0].ps=ps)){
              res.send('1')
            }
            else{
              res.send('0')
            }
          })
          .catch((err)=>{
           res.send('0');
          })
      
  
  })

  module.exports=Router;