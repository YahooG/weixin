const express = require('express');
const router = express.Router();

router.get('/api/getAllUser', function (req, res, next) {
    res.json({ status: "失败", info: "服务器内部错误" });
});


router.get('/', function (req, res, next) {
    // let token = "weixin";
    // let signature = req.query.signature;
    // let timestamp = req.query.timestamp;
    // let echostr = req.query.echostr;
    // let nonce = req.query.nonce;

    // let oriArray = new Array();
    // oriArray[0] = nonce;
    // oriArray[1] = timestamp;
    // oriArray[2] = token;
    // oriArray.sort();
    // var original = oriArray.join('');
    // //加密 
    // var shaObj = new jsSHA(original, 'TEXT');
    // var scyptoString = shaObj.getHash('SHA-1', 'HEX');
    // if(signature == scyptoString){
    //     //验证成功
        res.json({ status: "ok", info: "连接成功" });
    // } else {
    //     res.json({ status: "ok", info: "连接失败" });
    //     //验证失败
    //     }
});






module.exports = router;
