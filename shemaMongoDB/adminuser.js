var mongoose=require('./mongoose');
var schemaAdminUser=new mongoose.Schema({
	user:{
		type:String,
		unique:true,
		require:true
	},
	password:{
		type:String,
		require:true
		}
	

});
var AdminUser=mongoose.model('AdminUser',schemaAdminUser);
module.exports=AdminUser;
