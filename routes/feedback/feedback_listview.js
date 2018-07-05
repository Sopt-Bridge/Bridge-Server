const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/', async (req, res) => {

	let getfeedbackQuery = 'SELECT Feedback.userIdx, Feedback.fboardContent, Feedback.fboardDate , Contents.contentsTitle FROM Feedback, Contents WHERE Feedback.contentsIdx=Contents.contentsIdx';

	let getfeedbackResult = await db.queryParam_None(getfeedbackQuery);

	if (!getfeedbackResult) {
		res.status(500).send({
			message : "Failed"
		});
	} else {
		res.status(201).send({
            message : "ok",
            data : [{contents_list:getfeedbackResult}]
        });
	}
});

module.exports = router;