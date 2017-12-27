const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const request = require('request');



const token = 'weixin';

router.get('/', function (req, res, next) {
    let { signature, timestamp, nonce, echostr } = req.query;
    if (!signature || !timestamp || !nonce || !echostr) {
        return res.send('invalid request');
    }
    let params = [token, timestamp, nonce];
    params.sort();

    let hash = crypto.createHash('sha1');
    let sign = hash.update(params.join('')).digest('hex');

    if (signature == sign) {
        res.send(echostr);
    } else {
        res.send('invalid sign');
    }
});


router.post('/', function (req, res, next) {
    let { signature, timestamp, nonce, echostr } = req.query;
    if (!signature || !timestamp || !nonce || !echostr) {
        return res.send('invalid request');
    }
    let params = [token, timestamp, nonce];
    params.sort();

    let hash = crypto.createHash('sha1');
    let sign = hash.update(params.join('')).digest('hex');

    if (signature == sign) {
        res.send(echostr);
        console.log('--------------------------------------------1');
    } else {
        res.send('invalid sign');
    }
});

const appId = 'wxfdef306b176c8b93';
const appsecret = 'b5dae8467401c3175d780db7f81d6ae2';


function getAccessToken() {
    request.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=
                    ${appId}&secret=${appsecret}`, {}, function (err, httpResponse, body) {
            if (err) {
                console.error(err);
            } else {
                console.log(body);
            }
        });
}



module.exports = router;
