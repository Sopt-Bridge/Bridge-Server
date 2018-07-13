const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {

	let groupIdx = req.body.groupIdx;
	let contentsIdx = req.body.contentsIdx;
	if ((groupIdx==null)||(contentsIdx==null)) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		 let deleteQuery = 'DELETE FROM GroupContent WHERE groupIdx=? and contentsIdx =?'
	     let deleteResult = await db.queryParam_Arr(deleteQuery,[groupIdx, contentsIdx]);

			if (!deleteResult) {
				res.status(500).send({
					message : "Server error"
				});
			} else {
				res.status(201).send({
					message : "ok"
				});
			}
		}
});

module.exports = router;
