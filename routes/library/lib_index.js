var express = require('express');
var router = express.Router();


router.use('/addgroup',require('./addgroup.js'));
router.use('/grouplist', require('./grouplist.js'));
router.use('/groupmodify', require('./groupmodify.js'));
module.exports = router;