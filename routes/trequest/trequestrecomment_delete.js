const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:ircmtIdx', async (req, res) => {

	let ircmtIdx = req.params.ircmtIdx;

	if (!ircmtIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let deleteQuery = 'DELETE FROM Irecomment WHERE ircmtIdx=?'
			let deleteResult = await db.queryParam_Arr(deleteQuery,[ircmtIdx]);

			if (!deleteResult) {
				res.status(500).send({
					message : "Fail at Server"
				});
			} else {
				res.status(201).send({
					message : "ok",
				});
			}
		}
});

module.exports = router;