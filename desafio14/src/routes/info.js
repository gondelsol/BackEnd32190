const express = require('express');
const { Router } = express;
const router = Router();
const path = require("path");
const { send } = require('process');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public','/info/info.html'));
});

router.post('/',(req, res) => {
    const argE = process.argv.slice(2);
    const path = process.execPath;
    const plat = process.platform;
    const proc = process.pid;
    const vNode = process.version;
    const folder = process.cwd();
    const memTot = process.memoryUsage().rss;
    res.send({argE, path, plat, proc, vNode, folder, memTot});
});
module.exports = router;