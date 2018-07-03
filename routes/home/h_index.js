var express = require('express');
var router = express.Router();


router.use('/recent',require('./recent.js'));
router.use('/nowtrend',require('./nowtrend.js'));
router.use('/recommended',require('./recommended.js'));


module.exports = router;