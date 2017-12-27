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
    getAccessToken();
});

const map =
    {
        "button": [
            {
                "name": "扫码",
                "sub_button": [
                    {
                        "type": "scancode_waitmsg",
                        "name": "扫码带提示",
                        "key": "rselfmenu_0_0",
                        "sub_button": []
                    },
                    {
                        "type": "scancode_push",
                        "name": "扫码推事件",
                        "key": "rselfmenu_0_1",
                        "sub_button": []
                    }
                ]
            },
            {
                "name": "发图",
                "sub_button": [
                    {
                        "type": "pic_sysphoto",
                        "name": "系统拍照发图",
                        "key": "rselfmenu_1_0",
                        "sub_button": []
                    },
                    {
                        "type": "pic_photo_or_album",
                        "name": "拍照或者相册发图",
                        "key": "rselfmenu_1_1",
                        "sub_button": []
                    },
                    {
                        "type": "pic_weixin",
                        "name": "微信相册发图",
                        "key": "rselfmenu_1_2",
                        "sub_button": []
                    }
                ]
            },
            {
                "name": "发送位置",
                "type": "location_select",
                "key": "rselfmenu_2_0"
            },
            {
                "type": "media_id",
                "name": "图片",
                "media_id": "MEDIA_ID1"
            },
            {
                "type": "view_limited",
                "name": "图文消息",
                "media_id": "MEDIA_ID2"
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
