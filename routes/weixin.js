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


const appId = 'wxfdef306b176c8b93';
const appsecret = 'b5dae8467401c3175d780db7f81d6ae2';



router.post('/', function (req, res, next) {
    //对公众号具体操作
    getAccessToken();
});


/**
 * 公众号底部Tab
 */

const map =
    {
        "button": [
            {
                "type": "view",
                "name": "我",
                "url": "http://www.baidu.com/"
            },

            {
                "type": "view",
                "name": "歌手简介",
                "url": "http://www.baidu.com/"
            },

            {
                "name": "菜单",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "搜索",
                        "url": "http://www.soso.com/"
                    },
                    {
                        "type": "view",
                        "name": "视频",
                        "url": "http://v.qq.com/"
                    },
                    {
                        "type": "view",
                        "name": "赞一",
                        "url": "http://v.qq.com/"
                    }]
            }]

    }

function getAccessToken() {
    request.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`, {}, function (err, httpResponse, body) {
        if (err) {
            console.error(err);
        } else {
            const result = JSON.parse(body);
            let access_token = result.access_token;
            request.post({ url: `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`, form: map }, function (err, httpResponse, body) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(JSON.parse(body));
                }
            });
        }
    });
}

module.exports = router;
