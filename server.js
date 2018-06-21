var express=require('express');
var app=express();
app.use(express.static(__dirname));

//підключаєм модуль body-parser і інтегруєм в express
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});

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
});
var Product=require('./shemaMongoDB/productShema');
var Category=require('./shemaMongoDB/categoryShema');
var AdminUser=require('./shemaMongoDB/adminuser');

var cookieParser=require('cookie-parser')();
app.use(cookieParser);

// Pidklucheemo cookie sesion i dayemo chas zyednannya 2 godyny
var session=require('cookie-session')({
	keys:['secret'],
	maxAge:2*60*60*1000
});
app.use(session);

//Pidkluchayemo Passport
var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());

//Stvoryuemo  passport lokal priyednuemo do passporta i relizuyemo logiku autrentyfikacii

var LocalStrategy=require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done){
	AdminUser.find({
		user:username,
		password:password
	},
	function(err,data){
		console.log(data);
		if(data.length){
			return done(null, {id:data[0]._id, user:data[0].user}) //запис даних в обєкт сесії
		}
		return done (null, false)
	})
}))
// zapysuemo dani obyekta yakiy povertaye strategiya, korystuvach avtoryzuyetsya

passport.serializeUser(
	function(user, done){
		console.log('serialize user:');
		console.log(user);
		done(null, user)
	}
)
 // pry vsih nastupnych zvernnennyah doservera vibuvayetsa dysserializaciya na osnovi danych sesiyi
 passport.deserializeUser(
 	function(id, done){
 		console.log("deserializeUser");
 		AdminUser.find({
 			_id:id.id
 		}, 
 		function(err, data){
 			console.log(data);
 			if(data.length==1)
 				done(null, {user:data[0].user})
 		})

 	})

//zapusk autyntyfikacii na osnovi likalnli strategii z vidpovidnym redirekt
	var auth=passport.authenticate(
		'local', {successRedirect:'/admin',
			failureRedirect:'/login'})

// pereviryayemo chy korystuvach avtoryzovaniy
	
	var myAuth=function(req, res, next){
		if(req.isAuthenticated()){
			next();
			console.log('next')
		}

		else 
			res.redirect('/login')
	}

	app.get('/admin', myAuth);
	app.get('/admin', function(req, res){
		console.log(req.user);
		console.log(req.session);
		res.sendFile(__dirname+'/viewAdmin/admin.html');

	});
	app.post('/login', auth);
	app.get('/login', function(req, res){
		res.sendFile(__dirname+'/login.html')
	})




 	
app.listen(process.env.PORT||8080);
console.log('run server!');
