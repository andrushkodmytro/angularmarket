var mongoose=require('./mongoose');
var schemaUser=new mongoose.Schema({
	password:{
		type:String,
		},
		id:{
			type:String,
			unique:true,
			// required:true
		},
		name:{
			type:String,
			unique:true,
			// required:true
		},
		accounts:{
			type:String,
			unique:true,
			// required:true
		},
		photos:{
			type:String,
			unique:true,
			// required:true
		}
	

});
var User=mongoose.model('User',schemaUser);
module.exports=User;


