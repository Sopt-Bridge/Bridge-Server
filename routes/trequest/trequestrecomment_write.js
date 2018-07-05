const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	let userIdx = req.body.userIdx;
	let ircmtContent = req.body.ircmtContent;
	let icmtIdx = req.body.icmtIdx;	

	if (!userIdx || !icmtIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let registerReviewQuery = 'INSERT INTO Irecomment (ircmtDate, ircmtContent, userIdx,icmtIdx) VALUES (?,?,?,?)'
		let registerReview = await db.queryParam_Arr(registerReviewQuery, [currentTime,ircmtContent, userIdx,icmtIdx]);

			if (!registerReview) {
				res.status(500).send({
					message : "Fail at Server"
				});
			} else {
				res.status(201).send({
					message : "ok"
				});
			}
		}
});

module.exports = router;