var mongoose=require('./mongoose');
var categorySchema=new mongoose.Schema({
	name:{
		type:String,
		unique:true,
		require:true},
	

});
var Category=mongoose.model("Category", categorySchema);
module.exports=Category;

