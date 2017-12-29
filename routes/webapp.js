var express = require('express');
var router = express.Router();

const user = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('webapp', {});
});


router.get('/login', function (req, res, next) {
  res.render('applogin', {});
});


router.post('/login', function (req, res, next) {
  user.findByCarIdAndPwd(req.body.cardId, req.body.pwd)
    .then((item => {
      if (item) {
        res.send('ok');
      }
    })).catch((error => {
      res.send('error');
    }));
});


router.get('/register', function (req, res, next) {
  res.render('appregister', {});
});


router.post('/regsiter', function (req, res, next) {
  user.add(req.body)
    .then((item => {
      if (item.insertId) {
        console.log(item);
        res.send('ok');
      } else {
        res.send('error');
      }
    })).catch((error => {
      res.send('error');
      console.error(error);
    }));
});





module.exports = router;