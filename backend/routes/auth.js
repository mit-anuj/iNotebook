const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('welcome to auth');
})

module.exports = router;