const mongoose = require('mongoose');

let Schema = mongoose.Schema;
 let userSchema=new Schema({
    // _id:{type:Number,required:true},
    mail:{type:String,required:true},
    ps:{type:String,required:true}
 })


 let user = mongoose.model('user',userSchema);
 module.exports=user;