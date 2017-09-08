var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;


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


  /* GET home page. */
router.get('/', function(req, res, next) {
    console.log("get route /");
  res.render('index', { title: 'Express' });
});

  
router.get("/createpolls",function(req,res,next){
  res.render("index",null);
});


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


// POST requests
// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

});


// router.post('/user/login',
//   passport.authenticate('local', {successRedirect:'/', failureRedirect:'/user/login',failureFlash: true}),
//   function(req, res) {

//     res.redirect('/');
//   });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/user/login');
});

module.exports = router;
