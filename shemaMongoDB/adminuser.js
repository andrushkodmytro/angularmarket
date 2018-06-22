var mongoose=require('./mongoose');
var schemaAdminUser=new mongoose.Schema({
	user:{
		type:String,
		unique:true,
		required:true
	},
	password:{
		type:String,
		required:true
		}
	

});
var AdminUser=mongoose.model('AdminUser',schemaAdminUser);
module.exports=AdminUser;
