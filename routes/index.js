var express = require('express');
var router = express.Router();

router.use('/home', require('./home/h_index.js'));
router.use('/search', require('./search/s_index.js'));

router.use('/contents', require('./contents/c_index.js'));
router.use('/feedback', require('./feedback/f_index.js'));
router.use('/trequest', require('./trequest/tre_index.js'));
router.use('/user', require('./user/u_index.js'));
router.use('/library', require('./library/lib_index.js'));
router.use('/subscribe', require('./subscribe/sub_index.js'));
router.use('/contents', require('./contents/c_index.js'));
router.use('/feedback', require('./feedback/f_index.js'));
router.use('/trequest', require('./trequest/tre_index.js'));
<<<<<<< HEAD
router.use('/library', require('./library/lib_index.js'));
=======
>>>>>>> 34949ba442eae1f4a6e30a218a98f214fcde5141

module.exports = router;
