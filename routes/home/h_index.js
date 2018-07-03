var express = require('express');
var router = express.Router();


router.use('/recent',require('./recent.js'));
router.use('/newtrend',require('./newtrend.js'));
router.use('/recommended',require('./recommended.js'));
router.use('/hitsort',require('./hitsort.js'));

module.exports = router;