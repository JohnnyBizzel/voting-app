var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

// var env = {
//   AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
//   AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
//   AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://auth0-test-jb-bizzel.c9users.io/callback'
// };


console.log("in dir routes / index");
// Get the user profile
router.get('/user/register', function(req, res, next) {
  res.render('register');
});



// // Render the login template
// router.get('/user/login',
//   function(req, res){
//       console.log("get /login");
//     res.render('login');
//   });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
// router.get('/callback',
//   passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
//   function(req, res) {
//     res.redirect(req.session.returnTo || '/user');
//   });
  
  
  /* GET home page. */
router.get('/', function(req, res, next) {
    console.log("get route /");
  res.render('index', { title: 'Express' });
});

  
router.get("/createpolls",function(req,res,next){
  res.render("index",null);
});



// router.get('/Login', function(req, res, next) {
//     console.log("get route /Login");
//   res.render('index', { title: 'Express' });
// });

router.get('/Home', function(req, res, next) {
    console.log("get route /Home");
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Log in' });
});

router.get("/Polldetailfull",function(req,res,next){
  res.render('index', { title: 'Poll detail ' });
});

router.get("/editthepoll",function(req,res,next){
  res.render('index', { title: 'Edit Poll' });
});

// router.get("/editpoll",function(req,res,next){
//   res.render("editpoll",null);
// });

// POST request
// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

console.log(name);

// 	// Validation
// 	req.checkBody('name', 'Name is required').notEmpty();
// 	req.checkBody('email', 'Email is required').notEmpty();
// 	req.checkBody('email', 'Email is not valid').isEmail();
// 	req.checkBody('username', 'Username is required').notEmpty();
// 	req.checkBody('password', 'Password is required').notEmpty();
// 	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

// 	var errors = req.validationErrors();

// 	if(errors){
// 		res.render('register',{
// 			errors:errors
// 		});
// 	} else {
// 		var newUser = new User({
// 			name: name,
// 			email:email,
// 			username: username,
// 			password: password
// 		});

// 		User.createUser(newUser, function(err, user){
// 			if(err) throw err;
// 			console.log(user);
// 		});

// 		req.flash('success_msg', 'You are registered and can now login');

// 		res.redirect('/user/login');
// 	}
});

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//   User.getUserByUsername(username, function(err, user){
//   	if(err) throw err;
//   	if(!user){
//   		return done(null, false, {message: 'Unknown User'});
//   	}

//   	User.comparePassword(password, user.password, function(err, isMatch){
//   		if(err) throw err;
//   		if(isMatch){
//   			return done(null, user);
//   		} else {
//   			return done(null, false, {message: 'Invalid password'});
//   		}
//   	});
//   });
//   }));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// });

router.post('/user/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/user/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/user/login');
});

module.exports = router;
