var express = require('express');
var router = express.Router();
var user = require('../models/users');


router.get("/", function (req, res, next) {
    user.queryAll().
        then(function (item) {
            res.render("admin", { userLIst: item });
        }).catch(function (err) {
            res.render("admin", { userLIst: null });
        });
});


router.post("/searchUser", function (req, res, next) {
    user.getThis(req.body)
        .then(function (item) {
            res.send(item[0]);
        }).catch(function (err) {
            res.send("err")
            console.error(err);
        });
});


router.post("/loginbtn", function (req, res) {
    if (req.body.name == "admin" && req.body.pwd == "admin") {
        res.json({ "data": "/admin" })
    }
});



router.post("/updateUser", function (req, res) {
    // var name = req.body.name
    // var pwd = req.body.pwd;
    // var wechat = req.body.wechat;
    // var phone = req.body.phone;
    // var card = req.body.card;
    // var sex = req.body.sex;
    user.updateUser(req.body)
        .then(function (item) {
            if (item.changedRows) {
                res.send('ok');
            } else {
                res.send('error');
            }
        }).catch(function (err) {
            res.send('error');
        });

    /**
     * 增加一个用户
     */
    // user.add(req.body)
    //   .then(function (item) {
    //     if (item.insertId) {
    //       res.send(item.insertId);
    //     } else {
    //       res.send('error');
    //     }
    //   }).catch(function (err) {
    //     res.send('error');
    //   });
});


router.post("/deleteUser", function (req, res, next) {
    user.del(req.body)
        .then(function (item) {
            console.log(item);
            res.send('ok');
        }).catch(function (err) {
            res.send('err');
            console.error(err);
        })
        ;
});





module.exports = router;
