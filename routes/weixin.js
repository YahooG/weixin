const express = require('express');
const router = express.Router();
const sha1 = require('sha1');


const config = {
    wechat: {
        appID: 'wxfdef306b176c8b93',
        appSecret: 'b5dae8467401c3175d780db7f81d6ae2',
        token: 'weixin'
    }
};



router.get('/', function (req, res, next) {

    var token = config.wechat.token
    
    let signature = req.query.signature;
    let timestamp = req.query.timestamp;
    let echostr = req.query.echostr;
    let nonce = req.query.nonce;

    var str = [token,timestamp,nonce].sort().join('');
    
    //加密 
    // var shaObj = new jsSHA(original, 'TEXT');
    // var scyptoString = shaObj.getHash('SHA-1', 'HEX');
    let scyptoString = sha1(original);
    
    if (signature == scyptoString) {
        //验证成功
        this.body = echostr + '';
    } else {
        this.body = 'wrong';
        //验证失败
    }
});






module.exports = router;
