var express = require('express');
var router = express.Router();


router.use('/search',require('./search.js'));


module.exports = router;