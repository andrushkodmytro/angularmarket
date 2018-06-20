var mongoose=require('mongoose');
mongoose.connect('mongodb://sailent:User2010@ds147440.mlab.com:47440/angularmarket');
console.log("mongodb connect...")
module.exports=mongoose;
