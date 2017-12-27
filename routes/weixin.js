const express = require('express');
const router = express.Router();
const crypto = require('crypto');

//xml解析模块
var XMLJS = require('xml2js');
//解析，将xml解析为json
var parser = new XMLJS.Parser();
//重组，将json重组为xml
var builder = new XMLJS.Builder();


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
        req.on("data", function (data) {
            //将xml解析
            parser.parseString(data.toString(), function (err, result) {
                var body = result.xml;
                var messageType = body.MsgType[0];
                //用户点击菜单响应事件
                if (messageType === 'event') {
                    var eventName = body.Event[0];
                    (EventFunction[eventName] || function () { })(body, req, res);
                    //自动回复消息
                } else if (messageType === 'text') {
                    EventFunction.responseNews(body, res);
                    //第一次填写URL时确认接口是否有效
                } else {
                    res.send(echostr);
                }
            });
        });
    } else {
        res.send('invalid sign');
    }
});



//微信客户端各类回调用接口
var EventFunction = {
    //关注
    subscribe: function (result, req, res) {
        //存入openid 通过微信的接口获取用户的信息同时存入数据库。
    },
    //注销
    unsubscribe: function (openid, req, res) {
        //删除对应id
    },
    //打开某个网页
    VIEW: function () {
        //根据需求，处理不同的业务
    },
    //自动回复
    responseNews: function (body, res) {
        //组装微信需要的json
        var xml = {
            xml: {
                ToUserName: body.FromUserName,
                FromUserName: body.ToUserName,
                CreateTime: + new Date(),
                MsgType: 'text',
                Content: '编辑@+您想说的话，我们可以收到'
            }
        };
        var reciviMessage = body.Content[0]
        if (/^\@.*/.test(reciviMessage)) {
            xml.xml.Content = '已经收到您的建议，会及时处理！'
        } //<br>//将json转为xml
        xml = builder.buildObject(xml); //<br>//发送给微信
        res.send(xml);
    }
}

module.exports = router;
