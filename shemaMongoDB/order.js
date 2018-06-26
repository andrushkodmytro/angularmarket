var mongoose=require('./mongoose');
var schemaOrder=new mongoose.Schema({
	orderNumber:{
		type:Number,
		required:true
	},
	data:{
		type:Date,
		default:Date.now
	},

	products:[{
		name:{
			type:String,
			required:true
		},
		model:{
			type:String,
			unique:true,
			required:true
		},
		category:{
			type:String,
			required:true
		},
		count:{
			type:Number,
			required:true
		},
		price:{
			type:Number,
			required:true
		},
		path:{
			type:String,
			required:true
		}
	}],
	})
var Order=mongoose.model("Order",schemaOrder);
module.exports=Order;
