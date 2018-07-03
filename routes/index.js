var express = require('express');
var router = express.Router();

router.use('/home', require('./home/h_index.js'));
router.use('/search', require('./search/s_index.js'))
router.use('/contents', require('./contents/c_index.js'))
module.exports = router;
