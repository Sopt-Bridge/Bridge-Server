var express = require('express');
var router = express.Router();

router.use('/addgroup',require('./addgroup.js'));
router.use('/getgroupcontent',require('./getgroupcontent.js'));
router.use('/groupdelete',require('./groupdelete.js'));
router.use('/contentdelete',require('./contentdelete.js'));
module.exports = router;