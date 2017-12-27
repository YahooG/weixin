const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const token = 'weixin';

router.get('/', function (req, res, next) {
    const { signature, timestamp, nonce, echostr } = req.query;

    if (!signature || !timestamp || !nonce || !echostr) {
        return res.send('invalid request');
    }
    const params = [token, timestamp, nonce];
    params.sort();

    const hash = crypto.createHash('sha1');
    const sign = hash.update(params.join('')).digest('hex');

    if (signature == sign) {
        res.send(echostr);
    } else {
        res.send('invalid sign');
    }
});


module.exports = router;
