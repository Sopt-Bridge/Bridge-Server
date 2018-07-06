var express = require('express');
var router = express.Router();

<<<<<<< HEAD
router.use('/addgroup',require('./addgroup.js'));
router.use('/getgroupcontent',require('./getgroupcontent.js'));
router.use('/groupdelete',require('./groupdelete.js'));
router.use('/contentdelete',require('./contentdelete.js'));
=======

router.use('/addgroup',require('./addgroup.js'));
router.use('/grouplist', require('./grouplist.js'));
router.use('/groupmodify', require('./groupmodify.js'));
>>>>>>> 34949ba442eae1f4a6e30a218a98f214fcde5141
module.exports = router;