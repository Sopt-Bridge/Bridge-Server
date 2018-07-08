const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
	let userUuid = req.body.userUuid;
	let selectQuery = `SELECT userUuid FROM User WHERE userUuid = ?`
	let selectResult = await db.queryParam_Arr(selectQuery, [userUuid]);

	if(!selectResult) {
		res.status(400).send({
			message : "null Value"
		});
	} else {
		let selectIdxQuery = `SELECT userIdx FROM User WHERE userUuid = ?`
		let selectIdxResult = await db.queryParam_Arr(selectIdxQuery, [userUuid]);

		if(!selectIdxResult){
			res.status(500),send({
				message : "Server error"
			});
		} else {
			let deleteUserQuery = `DELETE FROM User WHERE userIdx = ?`
			let deleteUserResult = await db.queryParam_Arr(deleteUserQuery, [selectIdxResult[0].userIdx]);

			if(!deleteUserResult) {
				res.status(500).send({
					message : "Server error"
				});
			} else {
				res.status(201).send({
					message : "success"
				});
			}
		}
	}
});


module.exports = router;