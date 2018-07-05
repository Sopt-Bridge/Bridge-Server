const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	let userIdx = req.body.userIdx;
	let icmtContent = req.body.icmtContent;
	let iboardIdx = req.body.iboardIdx;	

	if (!userIdx || !iboardIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let registerReviewQuery = 'INSERT INTO Icomment (icmtDate, icmtContent, userIdx,iboardIdx) VALUES (?,?,?,?)'
		let registerReview = await db.queryParam_Arr(registerReviewQuery, [currentTime,icmtContent, userIdx,iboardIdx]);

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