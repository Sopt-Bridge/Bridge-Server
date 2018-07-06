const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.get('/:userIdx', async (req, res) => {
	
	let userIdx = req.params.userIdx;
	let SelectLibQuery = `SELECT userIDx FROM User WHERE userIdx = ?`
	let SelectLibResult = await db.queryParam_Arr(SelectLibQuery, [userIdx]);

	if(!SelectLibResult) {
		res.status(400).send({
			message : "Null Value"
		});
	}  else {
		let SelectGroupQuery = `SELECT groupTitle, groupBgimage from Bridge.group WHERE userIdx = ? `
		let SelectGroupResult = await db.queryParam_Arr(SelectGroupQuery,[SelectLibResult[0].userIdx]);

		if(!SelectGroupResult){
			res.status(500).send({
				message : "Server error"
			});
		} else {
			res.status(200).send({
				message : "ok",
				data : [{contents_list : SelectGroupResult}]
			});
		}
	}

});

module.exports = router;