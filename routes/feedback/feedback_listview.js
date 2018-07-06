const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:lastcontentsIdx', async (req, res) => {
	let lastcontentsIdx = req.params.lastcontentsIdx;
    let maxindex = Number.MAX_VALUE;
    if(lastcontentsIdx == 0){
        lastcontentsIdx = maxindex+1;
    }
	let getfeedbackQuery = 'SELECT Feedback.userIdx, Feedback.fboardContent, Feedback.fboardDate , Contents.contentsTitle FROM Feedback, Contents WHERE Feedback.contentsIdx=Contents.contentsIdx and Feedback.contentsIdx<? limit 20';
	let getfeedbackResult = await db.queryParam_Arr(getfeedbackQuery,[lastcontentsIdx]);

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