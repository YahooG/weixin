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
                "name": "demo",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "test",
                        "url": "http://39.106.132.165/app"
                    },
                    {
                        "type": "view",
                        "name": "视频",
                        "url": "http://v.qq.com/"
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "BTN_GOOD"
                    }
                ]
            },
            {
                "name": "查询天气",
                "sub_button": [
                    {
                        "type": "click",
                        "name": "武汉",
                        "key": "BTN_TQ_WUHAN"
                    },
                    {
                        "type": "click",
                        "name": "上海",
                        "key": "BTN_TQ_SHANGHAI"
                    },
                    {
                        "type": "click",
                        "name": "北京",
                        "key": "BTN_TQ_BEIJING"
                    }
                ]
            },
            {
                "type": "click",
                "name": "帮助",
                "key": "BTN_HELP"
            }
        ]
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
