const express = require('express');
const {Router} = express;
const router = Router();

router.get('/', (req, res)=>{
    res.send('<h1>Index del desafio 4</h1>')
})

module.exports = router;