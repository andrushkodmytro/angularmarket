var express=require('express');
var app=express();
app.use(express.static(__dirname));

//підключаєм модуль body-parser і інтегруєм в express
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var Product=require('./productShema');
var Category=require('./categoryShema');

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})

app.post('/loadproducts', function(req,res){
 	if(req.body.name=="Всі категорії"){
		Product.find(function(err,result){
			res.send(result)
		})
	}
 	else {
		Product.find({category:req.body.name},function(err,result){
			res.send(result)
		})
 	}
 });
 app.get('/loadcategory', function(req,res){
	 Category.find(function(err,result){
		res.send(result)
	 })
 	
 })
 	
app.listen(process.env.PORT||8080);
console.log('run server!');
