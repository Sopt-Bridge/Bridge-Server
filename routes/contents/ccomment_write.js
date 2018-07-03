const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let current_time = moment().format('YYYY-MM-DD HH:mm:ss');
	let user_idx = req.body.user_idx;
	let Ccmt_content = req.body.Ccmt_content;
	let contents_idx = req.body.contents_idx;

	if (!user_idx || !contents_idx) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		    let registerReviewQuery = 'INSERT INTO Ccomment (Ccmt_date, Ccmt_content, ) VALUES ()'
			let registerReview = await db.queryParam_Arr(registerReviewQuery, [r_idx, r_content, r_photo, u_idx, s_idx]);

			if (!registerReview) {
				res.status(500).send({
					message : "Failed To Register review at Server"
				});
			} else {
				res.status(201).send({
					message : "Successful Register Review Data"
				});
			}
		}
});

module.exports = router;