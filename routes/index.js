var express = require('express');
var router = express.Router();

console.log("in dir routes / index");
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("get route /");
  res.render('index', { title: 'Express' });
});

// router.get("/createzone",function(req,res,next){
// res.render("createzone",null);
// });

router.get("/createpolls",function(req,res,next){
res.render("createpolls",null);

});

router.get('/Login', function(req, res, next) {
    console.log("get route /Login");
  res.render('index', { title: 'Express' });
});

router.get('/Home', function(req, res, next) {
    console.log("get route /Home");
  res.render('index', { title: 'Express' });
});

router.get("/createcomment",function(req,res,next){
res.render("createcomment",null);

});

router.get("/Polldetailfull",function(req,res,next){
res.render('index', { title: 'Poll detail ' });

});


router.get("/editpoll",function(req,res,next){
res.render("editpoll",null);

});

module.exports = router;
