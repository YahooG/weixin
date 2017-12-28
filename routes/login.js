var express = require('express');
var router = express.Router();
// const user = require('../models/users');
// var XMLJS = require('xml2js');

// var XMLJS = require('xml2js');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {});
});


/**
 * 微信的接口
 */

// router.get('/wechat', function(req, res, next) {

// });






module.exports = router;
