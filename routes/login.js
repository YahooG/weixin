var express = require('express');
var router = express.Router();
const user = require('../models/users');
// var XMLJS = require('xml2js');

user.add({name: '12312', pwd: 'asdasda', tas})
  .then(function(item){
      console.log(item);
  }).catch(function(err){

  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{});
});
// router.post("/",function(req,res,next){
//   console.log(req.body);
// })

/**
 * 微信的接口
 */

// router.get('/wechat', function(req, res, next) {
  
// });






module.exports = router;
