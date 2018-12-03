const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tattie',{useNewUrlParser:true});
let db =mongoose.connection;

db.on('error',function(error){
    console.log('Database connection failure:' + error);
})

db.on('open',function(){
    console.log('数据库连接成功！');
})
db.on('disconnected',function(){
    console.log('数据库连接断开');
})


// let Schema = mongoose.Schema;
//  let userSchema=new Schema({
//     _id:{type:Number,required:true},
//     mail:{type:String,required:true},
//     ps:{type:String,required:true}
//  })


//  let user = mongoose.model('user',userSchema);
//  module.exports=user