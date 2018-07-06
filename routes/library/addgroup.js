const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
	let userIdx = req.body.userIdx;
	let groupTitle = req.body.groupTitle;
	let groupBgimage = req.body.groupBgimage;
	let groupColor = req.body.groupColor;

	let selectLibQuery = 'SELECT libIdx From Library WHERE userIdx = ?'
	let selectLibResult = await db.queryParam_Arr(selectLibQuery, [userIdx]);

	if(!selectLibResult) {
		res.status(400).send({
			massage : "null Value"
		});
	} else {
		let insertGroupQuery = `INSERT INTO Bridge.group (libIdx, groupTitle, groupBgimage, groupColor) VALUES (?, ?, ?, ?)`
		let insertGroupResult = await db.queryParam_Arr(insertGroupQuery, [selectLibResult[0].libIdx, groupTitle, groupBgimage, groupColor]);

		if(!insertGroupResult){
			res.status(500).send({
				message : "Failed Insert Lib From Server"
			});
		} else {
			res.status(201).send({
				message : "success"
			});
		}
	}
});

module.exports = router;
