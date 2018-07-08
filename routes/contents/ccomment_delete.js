const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {

	let ccmtIdx = req.body.ccmtIdx;

	if (!ccmtIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let deleteQuery = 'DELETE FROM Ccomment WHERE ccmtIdx=?'
	    let deleteResult = await db.queryParam_Arr(deleteQuery,[ccmtIdx]);

		if (!deleteResult) {
			res.status(500).send({
			message : "Server error"
			});
		} else {
			res.status(201).send({
			message : "ok",
		});
		}
	}
});

module.exports = router;