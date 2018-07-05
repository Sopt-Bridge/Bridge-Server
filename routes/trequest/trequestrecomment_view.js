const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:icmtIdx', async (req, res) => {

	
    let icmtIdx = req.params.icmtIdx;
    // 대댓글 수 , 유저, 작성시간, 내용
	
	let recommentNum = 'SELECT count(IrcmtIdx) FROM Irecomment WHERE icmtIdx =?'
	let renumResult = await db.queryParam_Arr(recommentNum, [icmtIdx]);

	let getReviewListQuery = 'SELECT ircmtDate, ircmtContent, userIdx FROM Irecomment WHERE icmtIdx=?';
	let getReviewList = await db.queryParam_Arr(getReviewListQuery, [ icmtIdx]);

	if (!getReviewList) {
		res.status(500).send({
			message : "Failed"
		});
	} else {
		res.status(201).send({
            message : "ok",
            data : [{recommentNum:renumResult},{contents_list:getReviewList}]
        });
	}
});

module.exports = router;