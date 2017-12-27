const express = require('express');
const router = express.Router();

router.get('/api/getAllUser', function (req, res, next) {
    res.json({ status: "失败", info: "服务器内部错误" });
});




module.exports = router;
