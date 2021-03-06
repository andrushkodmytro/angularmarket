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
var Order=require('./shemaMongoDB/order');
var User=require('./shemaMongoDB/user.js')

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

var FacebookStrategy=require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: "169493947241604",
    clientSecret: "3b30369aa6cd0758fea81ec37748e228",
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields:["id","displayName","photos","emails"]
  },
  function(accessToken, refreshToken, profile, done) {
		console.log(profile)
    User.find({ id: profile.id }, function (err, data) {
      if(data.length==1)
      	return done(null, {id:data[0]._id})
      else{
				
      	
      	var newUser=new User({
      		'id':profile.id,
      		"name":profile.displayName,
      		"accounts":profile.accounts,
      		"photos":profile.photos[0].value||''
      	});
      	newUser.save(function(err,user){
      		return done(null,{id:user._id})
      	})
      }
    })
  }
))
 
//Stvoryuemo  passport lokal priyednuemo do passporta i relizuyemo logiku autrentyfikacii

var LocalStrategy=require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done){
	AdminUser.find({
		user:username,
		password:password
	},
	function(err,data){
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
 	function(user, done){
 		console.log("deserializeUser");
 		AdminUser.find({
 			_id:user.id
 		}, 
 		function(err, data){
 			console.log(data);
 			if(data.length==1)
 			return	done(null, {user:data[0].user})
		 })
		User.find({
			_id:user.id
		}, 
		function(err, data){
			// console.log(data);
			if(data.length)
			return	done(null, {user:data[0]})
		})

 	})

	app.get('/auth/facebook',
	 passport.authenticate('facebook'));
	
 app.get('/auth/facebook/callback',
	 passport.authenticate('facebook',
		 {successRedirect:"/",
		failureRedirect:"/"}));

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
	});
	app.post('/addproduct', function(req,res){
		var product=new Product(req.body);
		product.save(function(err,result){
			res.send(result)
		})
	});
	app.post('/removeproduct',function(req,res){
		Product.remove({_id:req.body._id},function(err,result){
			res.send(result)
		})
	})

	app.post('/editproduct',function(req,res){
		console.log(req.body);
		Product.update({_id:req.body._id},
			{$set:req.body},function(err,result){
			res.send(result)
		});

	})
	app.post("/addcategory",function(req,res){
		var category=new Category(req.body);
		category.save(function(err,result){
			res.send(result)
		})
	})
	app.post('/addorder',function(req,res){
		console.log(req.body)
		var order=new Order(req.body);
		order.save(function(err,result){
			console.log(err);
			console.log(result)
			res.send(result)
		})
		
	})
 	app.get('/loadorders',function(req,res){
		 Order.find(function(err,result){
			 res.send(result)
		 })
	 })
	 var multer=require('multer');
	 var storage=multer.diskStorage({
		 destination:function(req,file,cb){
			 cb(null,'./img')},
			 filename:function(req,file,cb){
				 cb(null,file.originalname)
			 }
	 });
	 var upload=multer({storage:storage})
	 app.post('/uploadfile',upload.single('upl'),function(req,res){
		 console.log(req);
		 res.send(req.file.path)
	 })
	 app.get('/fbgetuser',function(req,res){
		res.send(req.user)
	});
	app.get('/logout', function(req, res){
		console.log(req.user)
		req.logout();
		console.log("req.user: "+req.user)
		res.redirect('/');
	});

app.listen(process.env.PORT||8080);
console.log('run server!');
