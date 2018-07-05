const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	let userIdx = req.body.userIdx;
	let ccmtContent = req.body.CcmtContent;
	let contentsIdx = req.body.contentsIdx;

	if (!userIdx || !contentsIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let registerReviewQuery = 'INSERT INTO Ccomment (ccmtDate, ccmtContent, userIdx,contentsIdx) VALUES (?,?,?,?)'
			let registerReview = await db.queryParam_Arr(registerReviewQuery, [currentTime,ccmtContent, userIdx, contentsIdx]);

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