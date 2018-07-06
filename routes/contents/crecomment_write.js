const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');
//50개
router.post('/', async (req, res) => {
	let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	let userIdx = req.body.userIdx;
	let crecmtContent = req.body.crecmtContent;
	let ccmtIdx = req.body.ccmtIdx;

	if (!userIdx || !ccmtIdx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let registerReviewQuery = 'INSERT INTO Crecomment (crecmtDate, crecmtContent, userIdx,ccmtIdx) VALUES (?,?,?,?)'
			let registerReview = await db.queryParam_Arr(registerReviewQuery, [currentTime,crecmtContent, userIdx, ccmtIdx]);

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