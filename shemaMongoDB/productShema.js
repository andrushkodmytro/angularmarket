var mongoose=require('./mongoose');
var productSchema=new mongoose.Schema({
	name:{
		type:String,
		require:true},
	model:{
		type:String,
		unique:true,
		require:true
		},
	price:{
		type:Number,
		require:true
		},
	category:	{
		type:String,
		require:true
		},
		count:{
		type:Number,
		require:true
		},
		path:{
		type:String,
		require:true
		}

});
var Product=mongoose.model("Product", productSchema);
module.exports=Product;

