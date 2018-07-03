var express = require('express');
var router = express.Router();


//router.use('/ccomment_view',require('./ccomment_view.js'));
//router.use('/ccomment_write',require('./ccomment_write.js'));
router.use('/chit',require('./chit.js'));
router.use('/clike',require('./clike.js'));
//router.use('/crecomment_view',require('./crecomment_view.js'));
//router.use('/crecomment_write',require('./crecomment_write.js'));
//router.use('/getcontents',require('./getcontents.js'));
//router.use('/nextcontents',require('./nextcontents.js'));

module.exports = router;